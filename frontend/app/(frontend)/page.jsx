'use client'

import React, { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Testimonials from '@/components/Testimonials'
import BlogSection from '@/components/BlogSection'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, ChevronDown, Layers, Leaf, Clock, Hand, Sparkles, Timer, Trash2 } from 'lucide-react'
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
            MAR Mouth Chill – Your <span className="text-medical-teal italic">Trusted Aid</span> <br /> to Quit Tobacco
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

      {/* Why Choose MAR Mouth Chill - Grid Layout */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
            {/* Card 1: Why Choose MAR Mouth Chill */}
            <div
              onClick={() => setActiveCard(0)}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden ${activeCard === 0 ? 'lg:flex-[2] bg-medical-blue' : 'lg:flex-1 bg-medical-blue/95 hover:bg-medical-blue'
                }`}
            >
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className={`font-black mb-8 transition-all duration-300 text-white ${activeCard === 0 ? 'text-3xl' : 'text-2xl'}`}>
                    Why Choose MAR Mouth Chill
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
                          Compact and portable, MAR Mouth Chill lets you manage cravings anytime, anywhere.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2: How Mar Works */}
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
                    How MAR Mouth Chill Works
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

            {/* Card 3: How to Use */}
            <div
              onClick={() => setActiveCard(2)}
              className={`relative rounded-[2.5rem] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden ${activeCard === 2 ? 'lg:flex-[2]' : 'lg:flex-1'
                }`}
            >
              {/* Background with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B9FB5] to-[#4A8BA0]"></div>
              <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1505751172107-57325a3ec716?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center blur-sm"></div>
              
              <div className="relative z-10 p-8 h-full flex flex-col">
                <h3 className={`font-black leading-tight transition-all duration-300 text-white mb-6 ${activeCard === 2 ? 'text-2xl' : 'text-xl'}`}>
                  How Use Mar Mouth Chill
                </h3>
                
                {activeCard === 2 ? (
                  <div className="grid grid-cols-2 gap-3 flex-grow">
                    {/* Step 1 - PLACE */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex flex-col items-center text-center gap-2">
                        <h4 className="font-black text-base text-white mb-1">1. PLACE</h4>
                        <div className="w-16 h-16 mb-1 flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {/* Lips */}
                            <ellipse cx="100" cy="100" rx="50" ry="30" fill="#E8F4F8" opacity="0.9"/>
                            <ellipse cx="100" cy="95" rx="48" ry="25" fill="#D0E8F0"/>
                            <path d="M 60 95 Q 100 110 140 95" stroke="#B0D8E8" strokeWidth="2" fill="none"/>
                            {/* Hand with finger */}
                            <path d="M 140 80 Q 145 75 150 80 L 150 110 Q 145 115 140 110 Z" fill="#D0E8F0" opacity="0.9"/>
                            <ellipse cx="145" cy="75" rx="8" ry="10" fill="#E8F4F8"/>
                            {/* Small pouch/patch */}
                            <rect x="135" y="85" width="12" height="8" rx="2" fill="white" stroke="#B0D8E8" strokeWidth="1"/>
                          </svg>
                        </div>
                        <p className="text-white text-xs leading-tight font-medium">
                          Place one pouch<br />between your gum and lip.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 - LET IT WORK */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex flex-col items-center text-center gap-2">
                        <h4 className="font-black text-base text-white mb-1">2. LET IT WORK</h4>
                        <div className="w-16 h-16 mb-1 flex items-center justify-center relative">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {/* Lips with pouch */}
                            <ellipse cx="100" cy="100" rx="50" ry="30" fill="#E8F4F8" opacity="0.9"/>
                            <ellipse cx="100" cy="95" rx="48" ry="25" fill="#D0E8F0"/>
                            <rect x="90" y="90" width="20" height="12" rx="2" fill="white" stroke="#B0D8E8" strokeWidth="1"/>
                            {/* Sparkles */}
                            <circle cx="50" cy="60" r="3" fill="white"/>
                            <circle cx="150" cy="60" r="3" fill="white"/>
                            <circle cx="45" cy="130" r="3" fill="white"/>
                            <circle cx="155" cy="130" r="3" fill="white"/>
                            <path d="M 60 70 L 62 75 L 67 75 L 63 78 L 65 83 L 60 80 L 55 83 L 57 78 L 53 75 L 58 75 Z" fill="white"/>
                            <path d="M 140 70 L 142 75 L 147 75 L 143 78 L 145 83 L 140 80 L 135 83 L 137 78 L 133 75 L 138 75 Z" fill="white"/>
                          </svg>
                        </div>
                        <p className="text-white text-xs leading-tight font-medium">
                          Feel the refreshing<br />sensation.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 - ENJOY */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex flex-col items-center text-center gap-2">
                        <h4 className="font-black text-base text-white mb-1">3. ENJOY</h4>
                        <div className="w-16 h-16 mb-1 flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {/* Smiley clock face */}
                            <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="6"/>
                            <circle cx="85" cy="90" r="5" fill="white"/>
                            <circle cx="115" cy="90" r="5" fill="white"/>
                            <path d="M 75 110 Q 100 130 125 110" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                            <line x1="100" y1="55" x2="100" y2="65" stroke="white" strokeWidth="3"/>
                            <line x1="145" y1="100" x2="135" y2="100" stroke="white" strokeWidth="3"/>
                            <line x1="100" y1="145" x2="100" y2="135" stroke="white" strokeWidth="3"/>
                            <line x1="55" y1="100" x2="65" y2="100" stroke="white" strokeWidth="3"/>
                          </svg>
                        </div>
                        <p className="text-white text-xs leading-tight font-medium">
                          Keep to place<br />for up to up at<br />30 minutes.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 - DISPOSE */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div className="flex flex-col items-center text-center gap-2">
                        <h4 className="font-black text-base text-white mb-1">4. DISPOSE</h4>
                        <div className="w-16 h-16 mb-1 flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {/* Trash bin */}
                            <rect x="70" y="90" width="60" height="70" rx="4" fill="none" stroke="white" strokeWidth="5"/>
                            <line x1="60" y1="90" x2="140" y2="90" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                            <path d="M 85 85 L 85 75 L 115 75 L 115 85" fill="none" stroke="white" strokeWidth="5"/>
                            <line x1="85" y1="100" x2="85" y2="145" stroke="white" strokeWidth="3"/>
                            <line x1="100" y1="100" x2="100" y2="145" stroke="white" strokeWidth="3"/>
                            <line x1="115" y1="100" x2="115" y2="145" stroke="white" strokeWidth="3"/>
                            {/* Hand disposing */}
                            <path d="M 110 50 Q 120 45 125 55 L 115 70" fill="#E8F4F8" opacity="0.9"/>
                            <rect x="112" y="52" width="10" height="6" rx="2" fill="white"/>
                          </svg>
                        </div>
                        <p className="text-white text-xs leading-tight font-medium">
                          Dispose in used<br />pouch in a a<br />waste bin
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full">
                    {/* <p className="text-base font-medium text-white/90 leading-relaxed">
                      Step-by-step guide
                    </p> */}
                    <div className="flex justify-end">
                      <div className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center text-white">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="bg-brand-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-medical-blue mb-8">Our Product</h2>
          <FeaturedProducts />
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
          <h3 className="text-2xl font-black text-medical-blue mb-6">More about MAR Mouth Chill</h3>
          <div className="text-medical-blue/60 text-sm leading-relaxed mb-4 font-medium transition-all">
            <p className="mb-4">
              MAR Mouth Chill works on the WHO approved Nicotine Replacement Therapy (NRT) principle with products like nicotine gums and lozenges. They are scientifically formulated tobacco control aids that help you manage cravings and ease most of the withdrawal symptoms associated with quitting tobacco. Whether quitting or cutting back, MAR Mouth Chill helps you transition away from tobacco slowly and steadily.
            </p>

            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-left space-y-6"
              >
                <p>The best part is, they come in discreet and pocket-friendly packaging. Therefore, it helps you manage the cravings easily, anywhere, anytime. Backed by the trust of medical professionals 8 out of 10 doctors recommend MAR Mouth Chill as a tobacco control aid . For those taking steps to avoid tobacco, MAR Mouth Chill is a simple, effective option you can rely on.</p>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">What Sets Mar Apart?</h4>
                  <p>What sets Mar apart is the proven effectiveness in preventing quitting tobacco related withdrawal symptoms. Quitting tobacco isn’t easy, but Mar makes it manageable with a research-backed approach and easy-to-use options. . Therefore, they are the best alternative that supports quitting and help you stay on track toward a tobacco -free life.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Backed with NRT Support</h4>
                  <p>MAR Mouth Chill uses a clinically approved Nicotine Replacement Therapy (NRT)which works to provide a precise, controlled dose of nicotine with each dosage. This helps ease withdrawal symptoms and curb cravings, allowing users to gradually reduce their nicotine intake and successfully overcome dependence over time.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Choice of formats</h4>
                  <p>MAR Mouth Chill gives you the flexibility to manage tobacco cravings your way. You can choose between gum or lozenges. If you prefer chewing, you can go with the gum. Need something more discreet - Lozenges can be an ideal option. You can even switch between the two, depending on what works best for you.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Refreshing Flavours</h4>
                  <p>MAR Mouth Chill comes with a special double coating to give you a refreshing minty experience. This gives you a fresh and pleasant flavour with every gum or lozenge. They are designed to cause low throat irritation, so you can use them comfortably throughout the day, without the harsh afterburn that some nicotine products leave behind.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Convenience</h4>
                  <p>Mar can easily fit in your pocket, making it easy to carry wherever you go. Whether you’re at home, at work, or out and about, you can quickly and discreetly manage your tobacco cravings.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">The Science Behind NRT</h4>
                  <p>Nicotine Replacement Therapy, or NRT,is a WHO approved proven way to quit tobacco intake by giving controlled amounts of nicotine in the form of nicotine gum and lozenges. NRT works as a nicotine replacement option by providing safer nicotine products without the harmful chemicals that impact your overall health.</p>
                  <p className="mt-2">Moreover, it also helps to reduce any withdrawal symptoms like irritability, anxiety, and strong cravings, which happen when your body notices the absence of nicotine. Nicotine in gum and lozenges is absorbed slowly through the lining of your mouth. This slow delivery helps keep cravings under control and can work as a great tobacco alternative.</p>
                  <p className="mt-2">Since NRT products come in different strengths, you can pick the one that fits how much nicotine you’re used to. Usually, it takes around 12 weeks to slowly cut back on the nicotine you use. This gradual approach helps to avoid nicotine withdrawal symptoms and increases the likelihood of successfully quitting nicotine in the long term.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Quit Tobacco with a Plan</h4>
                  <p>Quitting tobacco is no easy feat, but with the right plan, you can approach it with confidence and clarity. Mar offers guidance tailored to your tobacco consumption habits, whether you’re just beginning or have been addicted for years. To support you fully, our blog section is packed with insightful articles that cover everything from quitting strategies to managing cravings and withdrawal symptoms.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Join the Tobacco‑Free Movement</h4>
                  <p>Change doesn’t happen overnight, but every small step counts. At Mar, we believe that managing tobacco use isn’t just about willpower; it’s about having the right tools, the right plan, and the freedom to do it your way.</p>
                  <p className="mt-2">That’s why our approach goes beyond products. With Mar, you’re not just choosing gums or lozenges; you’re choosing flexibility, science-backed support, and the confidence to take control of your routine. Whether you prefer something chewable or discreet or need options that are easy to carry and fit into your day, Mar is designed suit your everyday needs.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">FAQs</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold">What is MAR Mouth Chill used for?</p>
                      <p>MAR Mouth Chill gums and lozenges are Nicotine Replacement Therapy (NRT) products designed to help manage nicotine cravings and withdrawal symptoms. They provide a controlled dose of nicotine without the harmful chemicals found in tobacco, making them a safer alternative than cigarettes.</p>
                    </div>
                    <div>
                      <p className="font-bold">Are NRT products harmful?</p>
                      <p>Nicotine Replacement Therapy (NRT) products are considered safe . and it supports your journey away from tobacco.</p>
                    </div>
                    <div>
                      <p className="font-bold">Which NRT product is best in India?</p>
                      <p>MAR Mouth Chill is one of the best NRT options available in India, offering both nicotine gums and lozenges.</p>
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
