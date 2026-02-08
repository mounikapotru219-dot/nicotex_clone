'use client'

import React, { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Testimonials from '@/components/Testimonials'
import BlogSection from '@/components/BlogSection'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, ChevronDown, Layers, Leaf, Clock } from 'lucide-react'
import Link from 'next/link'

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      setCount(Math.floor(end * percentage))

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

const TrustIndicator = ({ img, title, desc, color }) => (
  <div className={`relative overflow-hidden rounded-[2.5rem] p-8 h-full min-h-[220px] group transition-all hover:-translate-y-2 ${color}`}>
    <div className="absolute top-0 right-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity">
      <img src={img} className="w-full h-full object-cover" alt="" />
    </div>
    <div className="relative z-10 flex flex-col h-full justify-between">
      <h3 className="font-black text-white text-xl leading-tight mb-2 max-w-[120px]">{title}</h3>
      <p className="text-white/80 text-xs font-bold leading-relaxed max-w-[150px]">{desc}</p>
    </div>
  </div>
)

export default function HomePage() {
  const [showMore, setShowMore] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  return (
    <div className="space-y-0 overflow-x-hidden bg-white">
      <Hero />

      {/* Stats Section - Match Image */}
      <section className="py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-black text-medical-blue mb-2">
            Nicotex – Your <span className="text-medical-teal italic">Trusted Aid</span> <br /> to Quit Tobacco
          </h2>
          <div className="py-6">
            <h3 className="text-5xl lg:text-7xl font-black text-medical-teal mb-2">
              <CountUp end={25000} duration={2000} />++
            </h3>
            <p className="text-medical-blue/60 font-black uppercase tracking-[0.3em] text-sm">
              Pleasant users have <br /> successfully tobacco free
            </p>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-medical-blue italic mt-6">
            Helps reduce tobacco urges <span className="text-medical-teal">in 5 minutes*</span>
          </p>
        </div>
      </section>

      {/* Trust Indicators - Redesigned Cards with Images */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrustIndicator
              color="bg-brand-600"
              title="Success Stories"
              desc="Transformative journeys of people who quit for good."
              img="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
            />
            <TrustIndicator
              color="bg-medical-teal"
              title="Find the Method"
              desc="Discover the right approach tailored for your needs."
              img="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop"
            />
            <TrustIndicator
              color="bg-brand-700"
              title="Expert Help"
              desc="Connect with specialists for professional guidance."
              img="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop"
            />
            <TrustIndicator
              color="bg-brand-500"
              title="Suggested Dosage"
              desc="Understand the science of replacement therapy."
              img="https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=2070&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Nicotex - Grid Layout */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
            {/* Card 1: Why Choose Nicosure */}
            <div
              onClick={() => setActiveCard(0)}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden ${activeCard === 0 ? 'lg:flex-[2] bg-medical-blue' : 'lg:flex-1 bg-medical-blue/95 hover:bg-medical-blue'
                }`}
            >
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className={`font-black mb-8 transition-all duration-300 text-white ${activeCard === 0 ? 'text-3xl' : 'text-2xl'}`}>
                    Why Choose Nicosure
                  </h3>
                  <ul className="space-y-8">
                    <li className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                      <div className={`transition-opacity duration-300 ${activeCard === 0 ? 'opacity-100' : 'opacity-80'}`}>
                        <h4 className="font-bold text-xl mb-1 text-white">Choice of Formats</h4>
                        <p className={`text-white/80 font-medium leading-relaxed transition-all duration-500 ${activeCard === 0 ? 'block' : 'hidden'}`}>
                          Control tobacco urges with your preferred format of chewable gums, discreet lozenges, or both.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div className={`transition-opacity duration-300 ${activeCard === 0 ? 'opacity-100' : 'opacity-80'}`}>
                        <h4 className="font-bold text-xl mb-1 text-white">Refreshing Flavor</h4>
                        <p className={`text-white/80 font-medium leading-relaxed transition-all duration-500 ${activeCard === 0 ? 'block' : 'hidden'}`}>
                          Enjoy a burst of refreshing taste with our uniquely coated, nicotine-masking flavor system.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className={`transition-opacity duration-300 ${activeCard === 0 ? 'opacity-100' : 'opacity-80'}`}>
                        <h4 className="font-bold text-xl mb-1 text-white">Convenience</h4>
                        <p className={`text-white/80 font-medium leading-relaxed transition-all duration-500 ${activeCard === 0 ? 'block' : 'hidden'}`}>
                          Compact and portable, Nicosure lets you manage cravings anytime, anywhere.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2: How Nicotex Works */}
            <div
              onClick={() => setActiveCard(1)}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden group ${activeCard === 1 ? 'lg:flex-[2] bg-brand-400' : 'lg:flex-1 bg-brand-400/95 hover:bg-brand-400'
                }`}
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-20 transition-transform duration-700 group-hover:scale-110">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className={`font-black mb-4 leading-tight transition-all duration-300 text-white ${activeCard === 1 ? 'text-4xl' : 'text-2xl'}`}>
                    How Nicotex Works
                  </h3>
                  <p className={`text-lg font-medium text-white/90 leading-relaxed transition-all duration-500 ${activeCard === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                    Clinically proven NRT therapy to help you quit.
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className={`w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center transition-all ${activeCard === 1 ? 'bg-white text-brand-600' : 'text-white'}`}>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Suggested Dosage */}
            <div
              onClick={() => setActiveCard(2)}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden group ${activeCard === 2 ? 'lg:flex-[2] bg-brand-800' : 'lg:flex-1 bg-brand-800/95 hover:bg-brand-800'
                }`}
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-20 transition-transform duration-700 group-hover:scale-110">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className={`font-black mb-4 leading-tight transition-all duration-300 text-white ${activeCard === 2 ? 'text-4xl' : 'text-2xl'}`}>
                    Suggested Dosage
                  </h3>
                  <p className={`text-lg font-medium text-white/90 leading-relaxed transition-all duration-500 ${activeCard === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                    Find your personalized plan for success.
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className={`w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center transition-all ${activeCard === 2 ? 'bg-white text-brand-900' : 'text-white'}`}>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-brand-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-medical-blue mb-8">Our Products</h2>
          <FeaturedProducts />
          <div className="mt-8">
            <Link href="/products" className="text-medical-teal font-black text-lg underline underline-offset-8">VIEW ALL</Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-medical-blue mb-10 italic">Our Community Speaks</h2>
          <Testimonials />
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-medical-blue mb-10 italic">Blogs</h2>
          <BlogSection hideHeader={true} limit={3} />
          <div className="mt-8 flex justify-center gap-8 items-center">
            <Link href="/blogs" className="text-medical-teal font-black text-lg underline underline-offset-8">VIEW ALL</Link>
          </div>
        </div>
      </section>

      {/* Info Section - Bottom cyan placeholder from image */}
      <section className="py-12 bg-brand-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-black text-medical-blue mb-6">More about Nicotex</h3>
          <div className="text-medical-blue/60 text-sm leading-relaxed mb-4 font-medium transition-all">
            <p className="mb-4">
              Nicotex works on the WHO approved Nicotine Replacement Therapy (NRT) principle with products like nicotine gums and lozenges. They are scientifically formulated tobacco control aids that help you manage cravings and ease most of the withdrawal symptoms associated with quitting tobacco. Whether quitting or cutting back, Nicotex helps you transition away from tobacco slowly and steadily.
            </p>

            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-left space-y-6"
              >
                <p>The best part is, they come in discreet and pocket-friendly packaging. Therefore, it helps you manage the cravings easily, anywhere, anytime. Backed by the trust of medical professionals 8 out of 10 doctors recommend Nicotex as a tobacco control aid . For those taking steps to avoid tobacco, Nicotex is a simple, effective option you can rely on.</p>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">What Sets Nicotex Apart?</h4>
                  <p>What sets Nicotex apart is the proven effectiveness in preventing quitting tobacco related withdrawal symptoms. Quitting tobacco isn’t easy, but Nicotex makes it manageable with a research-backed approach and easy-to-use options. . Therefore, they are the best alternative that supports quitting and help you stay on track toward a tobacco -free life.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Backed with NRT Support</h4>
                  <p>Nicotex uses a clinically approved Nicotine Replacement Therapy (NRT)which works to provide a precise, controlled dose of nicotine with each dosage. This helps ease withdrawal symptoms and curb cravings, allowing users to gradually reduce their nicotine intake and successfully overcome dependence over time.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Choice of formats</h4>
                  <p>Nicotex gives you the flexibility to manage tobacco cravings your way. You can choose between gum or lozenges. If you prefer chewing, you can go with the gum. Need something more discreet - Lozenges can be an ideal option. You can even switch between the two, depending on what works best for you.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Refreshing Flavours</h4>
                  <p>Nicotex comes with a special double coating to give you a refreshing minty experience. This gives you a fresh and pleasant flavour with every gum or lozenge. They are designed to cause low throat irritation, so you can use them comfortably throughout the day, without the harsh afterburn that some nicotine products leave behind.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Convenience</h4>
                  <p>Nicotex can easily fit in your pocket, making it easy to carry wherever you go. Whether you’re at home, at work, or out and about, you can quickly and discreetly manage your tobacco cravings.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">The Science Behind NRT</h4>
                  <p>Nicotine Replacement Therapy, or NRT,is a WHO approved proven way to quit tobacco intake by giving controlled amounts of nicotine in the form of nicotine gum and lozenges. NRT works as a nicotine replacement option by providing safer nicotine products without the harmful chemicals that impact your overall health.</p>
                  <p className="mt-2">Moreover, it also helps to reduce any withdrawal symptoms like irritability, anxiety, and strong cravings, which happen when your body notices the absence of nicotine. Nicotine in gum and lozenges is absorbed slowly through the lining of your mouth. This slow delivery helps keep cravings under control and can work as a great tobacco alternative.</p>
                  <p className="mt-2">Since NRT products come in different strengths, you can pick the one that fits how much nicotine you’re used to. Usually, it takes around 12 weeks to slowly cut back on the nicotine you use. This gradual approach helps to avoid nicotine withdrawal symptoms and increases the likelihood of successfully quitting nicotine in the long term.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Quit Tobacco with a Plan</h4>
                  <p>Quitting tobacco is no easy feat, but with the right plan, you can approach it with confidence and clarity. Nicotex offers guidance tailored to your tobacco consumption habits, whether you’re just beginning or have been addicted for years. To support you fully, our blog section is packed with insightful articles that cover everything from quitting strategies to managing cravings and withdrawal symptoms.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Join the Tobacco‑Free Movement</h4>
                  <p>Change doesn’t happen overnight, but every small step counts. At Nicotex, we believe that managing tobacco use isn’t just about willpower; it’s about having the right tools, the right plan, and the freedom to do it your way.</p>
                  <p className="mt-2">That’s why our approach goes beyond products. With Nicotex, you’re not just choosing gums or lozenges; you’re choosing flexibility, science-backed support, and the confidence to take control of your routine. Whether you prefer something chewable or discreet or need options that are easy to carry and fit into your day, Nicotex is designed suit your everyday needs.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">FAQs</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold">What is Nicotex used for?</p>
                      <p>Nicotex gums and lozenges are Nicotine Replacement Therapy (NRT) products designed to help manage nicotine cravings and withdrawal symptoms. They provide a controlled dose of nicotine without the harmful chemicals found in tobacco, making them a safer alternative than cigarettes.</p>
                    </div>
                    <div>
                      <p className="font-bold">Are NRT products harmful?</p>
                      <p>Nicotine Replacement Therapy (NRT) products are considered safe . and it supports your journey away from tobacco.</p>
                    </div>
                    <div>
                      <p className="font-bold">Which NRT product is best in India?</p>
                      <p>Nicotex is one of the best NRT options available in India, offering both nicotine gums and lozenges.</p>
                    </div>
                    <div>
                      <p className="font-bold">Is nicotine gum better than tobacco?</p>
                      <p>Yes, nicotine gum is asafer alternative because it delivers nicotine slowly and steadily without exposing you to toxic chemicals produced by consuming tobacco.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-medical-teal font-black text-sm uppercase tracking-widest border-b-2 border-medical-teal pb-1 hover:text-medical-blue hover:border-medical-blue transition-colors"
          >
            {showMore ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </section >
    </div >
  )
}
