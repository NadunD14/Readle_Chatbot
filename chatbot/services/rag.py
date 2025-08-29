"""
RAG (Retrieval-Augmented Generation) service for document processing and retrieval
"""
import os
import glob
import re
from pathlib import Path
from typing import List, Tuple
from langchain_community.embeddings import OllamaEmbeddings
from langchain.embeddings import FakeEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import WebBaseLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema import Document

from chatbot.core.config import settings
from chatbot.models.schemas import RAGResult

class RAGService:
    """Enhanced RAG System with relevance scoring"""
    
    def __init__(self, relevance_threshold: float = None):
        self.relevance_threshold = relevance_threshold or settings.RAG_THRESHOLD
        self.embeddings = None
        self.vectorstore = None
        self.retriever = None
        self.pdf_folder = settings.PDF_FOLDER
        self.default_websites = settings.DEFAULT_WEBSITES
        
        self._initialize_embeddings()
    
    def _initialize_embeddings(self):
        """Initialize embeddings with fallback to fake embeddings"""
        try:
            if not settings.DISABLE_RAG:
                self.embeddings = OllamaEmbeddings(model=settings.OLLAMA_MODEL)
                print(f"✅ Ollama embeddings initialized with model: {settings.OLLAMA_MODEL}")
            else:
                print("⚠️ RAG disabled via configuration")
        except Exception as e:
            print(f"⚠️ Ollama embeddings unavailable ({e}). Falling back to fake embeddings.")
            # FakeEmbeddings: deterministic small vectors for API compatibility
            self.embeddings = FakeEmbeddings(size=384)
    
    async def load_pdfs_from_folder(self, folder_path: str = None) -> List[Document]:
        """Load all PDF files from the specified folder"""
        if folder_path is None:
            folder_path = self.pdf_folder
        
        documents = []
        Path(folder_path).mkdir(parents=True, exist_ok=True)
        pdf_files = glob.glob(os.path.join(folder_path, "*.pdf"))
        
        print(f"📄 Found {len(pdf_files)} PDF files in {folder_path}")
        
        for pdf_file in pdf_files:
            try:
                print(f"📖 Loading PDF: {os.path.basename(pdf_file)}")
                loader = PyPDFLoader(pdf_file)
                pdf_docs = loader.load()
                
                # Add metadata to each document
                for doc in pdf_docs:
                    doc.metadata.update({
                        "source": pdf_file,
                        "source_type": "pdf",
                        "filename": os.path.basename(pdf_file)
                    })
                
                documents.extend(pdf_docs)
                print(f"✅ Loaded {len(pdf_docs)} pages from {os.path.basename(pdf_file)}")
                
            except Exception as e:
                print(f"❌ Error loading PDF {pdf_file}: {e}")
                continue
        
        return documents
    
    async def load_websites(self, urls: List[str]) -> List[Document]:
        """Load content from websites"""
        documents = []
        for url in urls:
            try:
                print(f"🌐 Loading website: {url}")
                loader = WebBaseLoader(url)
                docs = loader.load()
                
                # Add metadata to each document
                for doc in docs:
                    doc.metadata.update({
                        "source_type": "website",
                        "url": url
                    })
                
                documents.extend(docs)
                print(f"✅ Loaded content from {url}")
                
            except Exception as e:
                print(f"❌ Error loading {url}: {e}")
                continue
        
        return documents
    
    async def initialize_vectorstore(self, urls: List[str] = None, include_pdfs: bool = None) -> bool:
        """Initialize the vector store with documents"""
        if settings.DISABLE_RAG:
            print("⚠️ RAG disabled via configuration. Skipping vectorstore initialization.")
            return False
        
        if urls is None:
            urls = self.default_websites
        
        if include_pdfs is None:
            include_pdfs = settings.INCLUDE_PDFS
        
        try:
            all_documents = []
            
            # Load PDFs if enabled
            if include_pdfs:
                pdf_documents = await self.load_pdfs_from_folder()
                print(f"📚 Loaded {len(pdf_documents)} PDF documents")
                all_documents.extend(pdf_documents)
            
            # Load websites
            print("🌐 Starting to load websites...")
            web_documents = await self.load_websites(urls)
            print(f"✅ Loaded {len(web_documents)} web documents")
            all_documents.extend(web_documents)
            
            # Use fallback content if no documents loaded
            if not all_documents:
                print("⚠️ No documents loaded, using fallback content")
                fallback_content = self._create_fallback_content()
                all_documents = [
                    Document(
                        page_content=content,
                        metadata={"source": "fallback", "source_type": "fallback"}
                    ) for content in fallback_content
                ]
            
            # Split documents into chunks
            print("✂️ Starting document splitting...")
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=settings.CHUNK_SIZE,
                chunk_overlap=settings.CHUNK_OVERLAP,
                length_function=len
            )
            splits = text_splitter.split_documents(all_documents)
            print(f"📋 Created {len(splits)} document chunks")
            
            # Create vector store
            print("🔗 Creating vector store...")
            self.vectorstore = Chroma.from_documents(
                documents=splits,
                embedding=self.embeddings,
                persist_directory=settings.CHROMA_DIR
            )
            print("✅ Vector store created successfully")
            
            # Create retriever
            self.retriever = self.vectorstore.as_retriever(
                search_type="similarity_score_threshold",
                search_kwargs={
                    "k": settings.RETRIEVAL_K,
                    "score_threshold": settings.SIMILARITY_THRESHOLD
                }
            )
            
            print(f"🎯 RAG system initialized with {len(splits)} document chunks")
            return True
            
        except Exception as e:
            print(f"❌ Error initializing RAG system: {e}")
            return False
    
    def _create_fallback_content(self) -> List[str]:
        """Create fallback content when external sources can't be loaded"""
        return [
            """
            Dyslexia is a learning difference that affects reading, writing, and spelling. It's important to understand that dyslexia is not related to intelligence - people with dyslexia can be highly intelligent and successful.
            
            Key characteristics of dyslexia:
            - Difficulty with phonological processing (connecting sounds to letters)
            - Challenges with reading fluency and accuracy
            - Difficulties with spelling and writing
            - Problems with working memory and processing speed
            
            Dyslexia affects about 10-15% of the population and is a lifelong condition, but with proper support and strategies, people with dyslexia can learn to read and write effectively.
            """,
            """
            Reading strategies for children with dyslexia:
            - Use multi-sensory approaches (visual, auditory, kinesthetic)
            - Break down complex words into smaller parts
            - Practice phonics systematically
            - Use assistive technology when helpful
            - Provide plenty of time and patience
            - Focus on comprehension alongside decoding skills
            
            Remember: Every child with dyslexia is unique and may respond differently to various strategies.
            """,
            """
            Supporting a child with dyslexia at home:
            - Create a quiet, organized study space
            - Read aloud together regularly
            - Use audiobooks to support comprehension
            - Celebrate small victories and progress
            - Communicate regularly with teachers
            - Consider professional tutoring if needed
            - Maintain a positive, encouraging attitude
            """
        ]
    
    async def retrieve_with_relevance_check(self, query: str) -> RAGResult:
        """
        Retrieve relevant content and determine if it's relevant enough to use
        Returns: RAGResult with content, should_use_rag flag, and relevance score
        """
        if not self.retriever:
            return RAGResult(content="", should_use_rag=False, relevance_score=0.0)
        
        try:
            # Get documents with similarity scores
            docs_with_scores = self.vectorstore.similarity_search_with_relevance_scores(
                query, k=3
            )
            
            if not docs_with_scores:
                return RAGResult(content="", should_use_rag=False, relevance_score=0.0)
            
            # Get the best relevance score
            max_relevance_score = max(score for _, score in docs_with_scores)
            
            print(f"🔍 Query: {query}")
            print(f"📊 Max relevance score: {max_relevance_score}")
            print(f"🎯 Threshold: {self.relevance_threshold}")
            
            # Decide if we should use RAG based on relevance threshold
            should_use_rag = max_relevance_score >= self.relevance_threshold
            
            if should_use_rag:
                # Format the relevant content with better cleaning
                formatted_content = []
                for doc, score in docs_with_scores:
                    if score >= self.relevance_threshold:  # Only include highly relevant docs
                        # Clean the content
                        content = self._clean_document_content(doc.page_content)
                        
                        source_info = ""
                        if doc.metadata.get('source_type') == 'pdf':
                            source_info = f" (from {doc.metadata.get('filename', 'PDF')})"
                        elif doc.metadata.get('source_type') == 'website':
                            source_info = f" (from website)"
                        
                        formatted_content.append(f"{content}{source_info}")
                
                content = "\n\n".join(formatted_content)
                return RAGResult(
                    content=content,
                    should_use_rag=True,
                    relevance_score=max_relevance_score
                )
            else:
                return RAGResult(
                    content="",
                    should_use_rag=False,
                    relevance_score=max_relevance_score
                )
                
        except Exception as e:
            print(f"❌ Error retrieving content: {e}")
            return RAGResult(content="", should_use_rag=False, relevance_score=0.0)
    
    def _clean_document_content(self, content: str) -> str:
        """Clean document content to remove unwanted characters and formatting"""
        if not content:
            return ""
        
        # Remove excessive whitespace and normalize
        content = re.sub(r'\s+', ' ', content.strip())
        
        # Remove common PDF artifacts
        content = re.sub(r'[^\w\s\.\,\!\?\:\;\-\(\)\[\]\"\'\/]', '', content)
        
        # Remove very short fragments (likely artifacts)
        sentences = content.split('.')
        cleaned_sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
        content = '. '.join(cleaned_sentences)
        
        # Ensure proper ending
        if content and not content.endswith('.'):
            content += '.'
        
        return content
    
    def get_status(self) -> dict:
        """Get current RAG system status"""
        pdf_files = []
        if os.path.exists(self.pdf_folder):
            pdf_files = glob.glob(os.path.join(self.pdf_folder, "*.pdf"))
        
        return {
            "initialized": self.retriever is not None,
            "vectorstore_available": self.vectorstore is not None,
            "relevance_threshold": self.relevance_threshold,
            "default_websites": self.default_websites,
            "pdf_folder": self.pdf_folder,
            "pdf_files_found": [os.path.basename(f) for f in pdf_files],
            "total_pdf_files": len(pdf_files),
            "embeddings_type": type(self.embeddings).__name__ if self.embeddings else "None"
        }
    
    def update_threshold(self, new_threshold: float) -> Tuple[float, float]:
        """Update relevance threshold and return old and new values"""
        old_threshold = self.relevance_threshold
        self.relevance_threshold = new_threshold
        return old_threshold, new_threshold

# Global RAG service instance
rag_service = RAGService()
