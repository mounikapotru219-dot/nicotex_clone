'use client'

import React from 'react'
import Banner from '@/components/Banner'

export default function TermsOfServicePage() {
    return (
        <div className="bg-white min-h-screen pb-24">
            <Banner
                title="Terms of Service"
                breadcrumbs={[{ label: 'Terms', href: '/terms' }]}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">1. Agreement to Terms</h2>
                    <p>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Mar (“we,” “us” or “our”), concerning your access to and use of the Mar website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">2. Medical Disclaimer</h2>
                    <div className="bg-brand-50 border-l-4 border-brand-600 p-4 rounded-r-lg">
                        <p className="text-sm font-medium">
                            The contents of the Mar Site, such as text, graphics, images, and other material contained on the Mar Site ("Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">3. User Representations</h2>
                    <p className="mb-4">
                        By using the Site, you represent and warrant that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-brand-600">
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                        <li>You are not a minor in the jurisdiction in which you reside.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">4. Products and Purchases</h2>
                    <p>
                        We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-medical-blue mb-4">5. Limitation of Liability</h2>
                    <p>
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                    </p>
                </section>
            </div>
        </div>
    )
}
