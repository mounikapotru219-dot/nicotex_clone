'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Phone,
    Mail,
    MessageSquare,
    HelpCircle,
    ChevronDown,
    Search,
    BookOpen,
    LifeBuoy,
    Clock,
    ShieldCheck
} from 'lucide-react'

const FAQ_DATA = [
    {
        question: "How do I choose the right strength for me?",
        answer: "The right strength depends on how many cigarettes you currently smoke. Generally, if you smoke more than 10-15 cigarettes a day, we recommend starting with a higher dosage (4mg gum or 21mg patch). If you smoke fewer, start with 2mg or 14mg."
    },
    {
        question: "Are there any side effects?",
        answer: "Some users may experience mild side effects like hiccups, sore throat, or skin irritation with patches. These are usually temporary as your body adjusts. Consult with our experts if they persist."
    },
    {
        question: "Can I use gums and patches together?",
        answer: "Yes, this is often called 'Combination Therapy' and is clinically proven to be more effective for heavy smokers. One providing a steady base and the other for breakthrough cravings."
    },
    {
        question: "How long should I use Mar products?",
        answer: "The standard treatment cycle is usually 8-12 weeks, gradually reducing the dosage. However, every journey is unique, and our counselors can help you plan your specific timeline."
    }
]

const ContactCard = ({ icon: Icon, title, value, label, sublabel, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-gray-50 flex flex-col h-full group hover:bg-brand-600 transition-all duration-500">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-brand-600 transition-all`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-medical-blue mb-2 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-2xl font-black text-brand-600 mb-2 group-hover:text-white transition-colors">{value}</p>
        <div className="mt-auto">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-100 transition-colors uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-sm text-gray-500 group-hover:text-blue-50 transition-colors">{sublabel}</p>
        </div>
    </div>
)

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border border-gray-100 rounded-3xl overflow-hidden bg-white mb-4 shadow-soft">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-medical-blue text-lg">{question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

import Banner from '@/components/Banner'

// ... (keep unused imports if needed or remove them. I'll keep them to avoid breaking)

export default function SupportPage() {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* Simple Banner */}
            <Banner
                title="Support Center"
                description="We're here to help you on your journey."
                breadcrumbs={[{ label: 'Support', href: '/support' }]}
                className="py-24 lg:py-32"
            />

            {/* Search Section - Simplified */}
            <section className="relative z-30 px-4 sm:px-8 -mt-8">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="relative group w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type your question..."
                            className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 focus:border-brand-600 rounded-xl text-base font-medium outline-none transition-all"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-medical-blue text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-brand-700 transition-all">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Contact Grid - Simplified */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <ContactCard
                        icon={Phone}
                        title="Call Support"
                        value="1800-NIC-SURE"
                        label="Toll Free"
                        sublabel="Mon-Sat, 9AM to 7PM"
                        color="bg-brand-600"
                    />
                    <ContactCard
                        icon={MessageSquare}
                        title="Chat with us"
                        value="Live Expert Chat"
                        label="Instant Support"
                        sublabel="Available 24/7 for cravings"
                        color="bg-medical-teal"
                    />
                    <ContactCard
                        icon={Mail}
                        title="Email Help"
                        value="marufood44@gmail.com"
                        label="Official Channel"
                        sublabel="Response within 24 hours"
                        color="bg-medical-blue"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* FAQ Section - Simplified */}
                    <div>
                        <h2 className="text-2xl font-black text-medical-blue mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {FAQ_DATA.map((item, idx) => (
                                <FAQItem key={idx} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Area - Simplified */}
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-xl font-black text-medical-blue mb-2">Need specific help?</h3>
                            <p className="text-sm text-gray-500">Fill out the form below and we will reach out shortly.</p>
                        </div>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input type="text" className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-500" placeholder="Full Name" />
                                <input type="email" className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-500" placeholder="Email Address" />
                            </div>
                            <div className="relative">
                                <select className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-500 appearance-none cursor-pointer">
                                    <option>Product Dosage Support</option>
                                    <option>Technical Account Assistance</option>
                                    <option>Order & Billing Inquiries</option>
                                    <option>Counseling & Success Stories</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <textarea className="w-full h-32 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-500 resize-none" placeholder="Your message..."></textarea>
                            <button className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold text-base hover:bg-brand-700 transition-all shadow-md">
                                Submit Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
