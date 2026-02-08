'use client'

import React from 'react'
import Banner from '@/components/Banner'

export default function CookiesPolicyPage() {
    return (
        <div className="bg-white min-h-screen pb-24">
            <Banner
                title="Cookie Policy"
                breadcrumbs={[{ label: 'Cookies', href: '/cookies' }]}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">1. Use of Cookies</h2>
                    <p>
                        Nicotex ("we", "us", or "our") uses cookies on the Nicotex website (the "Service"). By using the Service, you consent to the use of cookies.
                        Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">2. What are Cookies</h2>
                    <p>
                        Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">3. How Nicotex Uses Cookies</h2>
                    <p className="mb-4">
                        When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-brand-600">
                        <li><strong>Essential Cookies:</strong> To enable certain functions of the Service, specifically authentication and cart persistence.</li>
                        <li><strong>Analytics Cookies:</strong> To provide analytics and understand how our site is being used.</li>
                        <li><strong>Preferences Cookies:</strong> To store your preferences.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">4. Third-Party Cookies</h2>
                    <p>
                        In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">5. Reviewing Your Choices</h2>
                    <p>
                        If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                    </p>
                </section>
            </div>
        </div>
    )
}
