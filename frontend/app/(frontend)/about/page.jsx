'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, Target, Award, Rocket } from 'lucide-react'

const StatCard = ({ icon: Icon, value, label }) => (
    <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-gray-50 text-center">
        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-6">
            <Icon className="w-8 h-8" />
        </div>
        <div className="text-4xl font-black text-medical-blue mb-2">{value}</div>
        <div className="text-gray-500 font-medium uppercase tracking-widest text-xs">{label}</div>
    </div>
)

const ValueCard = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-6 p-8 rounded-[2.5rem] bg-medical-slate hover:bg-white hover:shadow-premium transition-all border border-transparent hover:border-gray-100 group">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-soft group-hover:bg-brand-600 group-hover:text-white transition-all shrink-0">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-medical-blue mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
        </div>
    </div>
)

export default function AboutPage() {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* Hero Section - Unique Style: Split Background with Mesh */}
            <section className="relative py-8 lg:py-12 overflow-hidden bg-medical-slate">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/60 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-teal/10 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-premium mb-6 border border-brand-100">
                                <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                                <span className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em]">Since 2011</span>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-black text-medical-blue leading-tight mb-6 tracking-tight">
                                Empowering Lives to <span className="gradient-text">Quit for Good.</span>
                            </h1>
                            <p className="text-lg text-gray-500 leading-relaxed mb-8 font-medium max-w-lg">
                                At Nicotex, we believe everyone deserves a second chance at a healthy life. Our mission is to provide science-backed tools to help you break free from smoking.
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-black text-base shadow-xl shadow-brand-500/20 hover:bg-brand-700 transition-all">
                                    Join Our Community
                                </button>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-[3rem] overflow-hidden shadow-premium group aspect-[4/3] lg:aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop"
                                    alt="Health Journey"
                                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent" />
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-premium border border-white/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-premium rounded-xl flex items-center justify-center text-white shadow-lg">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-2xl text-medical-blue">10M+</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Lives Impacted</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={Award} value="15+" label="Years Expertise" />
                        <StatCard icon={Users} value="10M+" label="Happy Users" />
                        <StatCard icon={Target} value="98%" label="Success Rate" />
                        <StatCard icon={Rocket} value="50+" label="Global Awards" />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-12 bg-medical-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Built on <span className="text-medical-teal font-black">Trust & Science</span></h2>
                        <p className="text-brand-100/60 max-w-xl mx-auto text-base leading-relaxed font-medium">
                            Our solutions are backed by decades of medical research and continuous consumer feedback.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ValueCard
                            icon={Shield}
                            title="Science-First Approach"
                            desc="Every Nicotex product undergoes rigorous clinical testing and evaluation to ensure peak safety and effectiveness."
                        />
                        <ValueCard
                            icon={Heart}
                            title="Patient Centricity"
                            desc="We design treatments with the user's lifestyle in mind, ensuring a seamless and sustainable transition."
                        />
                        <ValueCard
                            icon={Users}
                            title="Community Support"
                            desc="Connect with millions of fellow quitters for motivation, shared experiences, and peer support."
                        />
                        <ValueCard
                            icon={Rocket}
                            title="Continuous Innovation"
                            desc="We constantly iterate our formulations to achieve the highest possible success rate in nicotine replacement."
                        />
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-12 bg-medical-slate relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-white rounded-[3rem] p-10 lg:p-20 shadow-premium border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-50/40 via-transparent to-medical-teal/5 opacity-50" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-black text-medical-blue mb-6 tracking-tight">Our Vision for a <span className="gradient-text">Smokefree 2030</span></h2>
                                <p className="text-lg text-gray-500 leading-relaxed mb-8 font-medium">
                                    We aim to reduce global smoking rates by 50% within the next decade through education and accessibility.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { t: 'Universal Accessibility', d: 'Making quit-kits available to everyone.' },
                                        { t: 'Digital Transformation', d: 'Smart tracking apps and AI coaching.' },
                                        { t: 'Environmental Responsibility', d: 'Developing biodegradable patches & gums.' }
                                    ].map((item) => (
                                        <div key={item.t} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-soft shrink-0">
                                                <Rocket className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-medical-blue text-base">{item.t}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6 pt-12">
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-premium hover:scale-105 transition-transform duration-500">
                                        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop" alt="Health" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-premium hover:scale-105 transition-transform duration-500">
                                        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" alt="Success" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-premium hover:scale-105 transition-transform duration-500">
                                        <img src="https://images.unsplash.com/photo-1505751172107-57325a3ec716?q=80&w=2070&auto=format&fit=crop" alt="Medical" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-premium hover:scale-105 transition-transform duration-500">
                                        <img src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop" alt="Science" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
