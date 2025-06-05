import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-yellow-50 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Confident Reading Starts Here
            </h1>
            <p className="text-lg mb-8">
              Empower your child with dyslexia to enjoy reading with interactive, proven methods
              designed specifically for their unique learning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/learn-more" className="px-8 py-3 border border-black text-black font-medium rounded hover:bg-gray-100 text-center">
                Learn More
              </Link>
              <Link href="/sign-up" className="px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 text-center">
                Get Started
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="/images/hero-image.png" 
              alt="Children enjoying reading" 
              width={500} 
              height={400} 
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 md:px-12 lg:px-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-center mb-12">Follow these simple steps to get started</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border-2 border-gray-300 rounded-lg flex items-start">
              <div className="bg-purple-200 p-3 rounded-lg mr-4">
                <Image src="/images/how-it-works/image.png" alt="Create Account" width={60} height={60} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Create Account</h3>
                <p>Join Readle and set up your profile.</p>
              </div>
            </div>
            
            <div className="p-6 border-2 border-gray-300 rounded-lg flex items-start">
              <div className="bg-blue-200 p-3 rounded-lg mr-4">
                <Image src="/images/how-it-works/image-1.png" alt="Setup Parent" width={60} height={60} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Setup Parent</h3>
                <p>Provide necessary details for monitoring.</p>
              </div>
            </div>
            
            <div className="p-6 border-2 border-gray-300 rounded-lg flex items-start">
              <div className="bg-red-200 p-3 rounded-lg mr-4">
                <Image src="/images/how-it-works/image-2.png" alt="Setup Child" width={60} height={60} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Setup Child</h3>
                <p>Introduce your child to their learning path.</p>
              </div>
            </div>
            
            <div className="p-6 border-2 border-gray-300 rounded-lg flex items-start">
              <div className="bg-green-200 p-3 rounded-lg mr-4">
                <Image src="/images/how-it-works/image-3.png" alt="Start Learning" width={60} height={60} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Start Learning</h3>
                <p>Access games and activities designed for children with dyslexia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 md:px-12 lg:px-24 bg-yellow-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/images/our-features/image.png" alt="Games" width={120} height={120} className="mx-auto" />
              </div>
              <h3 className="font-bold mb-2">Games</h3>
              <p>Fun and engaging activities designed specifically for dyslexic learners.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/images/our-features/image-1.png" alt="Tracking" width={120} height={120} className="mx-auto" />
              </div>
              <h3 className="font-bold mb-2">Tracking</h3>
              <p>Monitor your child's improvement and progress over time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/images/our-features/image-2.png" alt="Rewards" width={120} height={120} className="mx-auto" />
              </div>
              <h3 className="font-bold mb-2">Rewards</h3>
              <p>Incentives that motivate children to continue learning.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <Image src="/images/our-features/image-3.png" alt="Support" width={120} height={120} className="mx-auto" />
              </div>
              <h3 className="font-bold mb-2">Support</h3>
              <p>Resources for effective parental guidance and education.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dyslexia Quiz Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto bg-blue-50 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Is Your Child Struggling with Reading?</h2>
              <p className="mb-6">Take our internationally recognized dyslexia identification quiz to see if your child might need specialized support.</p>
              <Link href="/quiz" className="px-8 py-3 bg-[#0D00A0] text-white font-medium rounded hover:bg-blue-700 inline-block">
                Start Free Quiz
              </Link>
            </div>
            <div className="md:w-1/3">
              <Image src="/quiz-illustration.png" alt="Dyslexia Quiz" width={300} height={300} className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 md:px-12 lg:px-24 bg-yellow-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Parents Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <span className="font-bold">SB</span>
                </div>
                <div>
                  <p className="font-bold">Sarah B.</p>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p>"Readle has made reading fun for my kid! The dyslexia-friendly activities have boosted his confidence tremendously."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <p className="font-bold">John D.</p>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p>"The progress tracking helps us stay on track. We can see real improvement in our daughter's reading abilities."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <span className="font-bold">TM</span>
                </div>
                <div>
                  <p className="font-bold">Tina M.</p>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p>"My child loves the games and activities! They've made learning to read enjoyable instead of frustrating."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <span className="font-bold">MP</span>
                </div>
                <div>
                  <p className="font-bold">Michael P.</p>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p>"Great platform for building literacy skills. The dyslexia identification quiz helped us understand our son's challenges."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 md:px-12 lg:px-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="bg-white p-8 shadow rounded-lg max-w-2xl mx-auto">
            <p className="text-center mb-8">
              Have questions about how Readle can help your child? Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>support@readle.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>1-800-READLE-1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#0D00A0] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Child's Reading Experience?</h2>
          <p className="text-xl mb-8">Join thousands of families who've discovered the joy of reading with Readle.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up" className="px-8 py-3 bg-white text-[#0D00A0] font-medium rounded hover:bg-gray-100 text-center">
              Sign Up Free
            </Link>
            <Link href="/learn-more" className="px-8 py-3 border border-white text-white font-medium rounded hover:bg-blue-700 text-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}