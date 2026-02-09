'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import api from '@/lib/api'
import { Filter, ChevronDown, Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('price-low') // Default sort
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products')
        setProducts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products
    .filter(p => filter === 'All' ? true : p.category === filter)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
      return 0
    })

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Newest Arrivals', value: 'newest' }
  ]

  return (
    <div >
      {/* Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden mb-12">
        <div className="absolute inset-0 bg-medical-blue/60 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1579165466541-74e2beeac7df?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Products Banner"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 space-y-10">
            <div>
              <h3 className="font-bold text-lg text-medical-blue mb-6 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Category</p>
                  <div className="space-y-3">
                    {['All', 'Gums', 'Patches', 'Lozenges'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filter === cat}
                          onChange={() => setFilter(cat)}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                        />
                        <span className={filter === cat ? "text-brand-600 font-bold" : "text-gray-600 group-hover:text-brand-600 transition-colors"}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Strength</p>
                  <div className="space-y-3">
                    {['2mg', '4mg', '7mg', '14mg', '21mg'].map((str) => (
                      <label key={str} className="flex items-center gap-3 text-gray-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                        <span>{str}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-premium rounded-2xl p-6 text-white text-center">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-xs text-blue-100 mb-4">Take our test to find the right strength for you.</p>
              <button className="w-full bg-white text-brand-600 py-2 rounded-lg font-bold text-sm">Start Test</button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-500 text-sm">Showing <span className="font-bold text-medical-blue">{filteredProducts.length}</span> results</p>
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-100 px-6 py-2.5 pr-12 rounded-xl text-sm font-bold text-medical-blue focus:outline-none focus:border-brand-500 transition-all cursor-pointer shadow-soft"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.value === sortBy ? `Sort by: ${opt.label}` : opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-brand-600 transition-colors" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-white rounded-premium animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-premium shadow-soft">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-medical-blue mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More about Nicotex Section */}
      <section className="py-12 bg-brand-50 mt-12">
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
                  <p>What sets Nicotex apart is the proven effectiveness in preventing quitting tobacco related withdrawal symptoms. Quitting tobacco isn't easy, but Nicotex makes it manageable with a research-backed approach and easy-to-use options. . Therefore, they are the best alternative that supports quitting and help you stay on track toward a tobacco -free life.</p>
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
                  <p>Nicotex can easily fit in your pocket, making it easy to carry wherever you go. Whether you're at home, at work, or out and about, you can quickly and discreetly manage your tobacco cravings.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">The Science Behind NRT</h4>
                  <p>Nicotine Replacement Therapy, or NRT,is a WHO approved proven way to quit tobacco intake by giving controlled amounts of nicotine in the form of nicotine gum and lozenges. NRT works as a nicotine replacement option by providing safer nicotine products without the harmful chemicals that impact your overall health.</p>
                  <p className="mt-2">Moreover, it also helps to reduce any withdrawal symptoms like irritability, anxiety, and strong cravings, which happen when your body notices the absence of nicotine. Nicotine in gum and lozenges is absorbed slowly through the lining of your mouth. This slow delivery helps keep cravings under control and can work as a great tobacco alternative.</p>
                  <p className="mt-2">Since NRT products come in different strengths, you can pick the one that fits how much nicotine you're used to. Usually, it takes around 12 weeks to slowly cut back on the nicotine you use. This gradual approach helps to avoid nicotine withdrawal symptoms and increases the likelihood of successfully quitting nicotine in the long term.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Quit Tobacco with a Plan</h4>
                  <p>Quitting tobacco is no easy feat, but with the right plan, you can approach it with confidence and clarity. Nicotex offers guidance tailored to your tobacco consumption habits, whether you're just beginning or have been addicted for years. To support you fully, our blog section is packed with insightful articles that cover everything from quitting strategies to managing cravings and withdrawal symptoms.</p>
                </div>

                <div>
                  <h4 className="font-black text-medical-blue text-lg mb-2">Join the Tobacco‑Free Movement</h4>
                  <p>Change doesn't happen overnight, but every small step counts. At Nicotex, we believe that managing tobacco use isn't just about willpower; it's about having the right tools, the right plan, and the freedom to do it your way.</p>
                  <p className="mt-2">That's why our approach goes beyond products. With Nicotex, you're not just choosing gums or lozenges; you're choosing flexibility, science-backed support, and the confidence to take control of your routine. Whether you prefer something chewable or discreet or need options that are easy to carry and fit into your day, Nicotex is designed suit your everyday needs.</p>
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
      </section>
    </div>
  )
}
