import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Star,
  CheckCircle2,
  Globe2,
  ShieldCheck
} from 'lucide-react';
import { featuredDestinations, stats } from '../data/mockData';
import SearchWidget from '../components/SearchWidget';
import { Button } from '../components/ui/Button';

const HomePage = () => {
  const loading = false;

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Hero — full-width banner + overlapped search (MakeMyTrip-style) */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end md:items-center justify-center overflow-hidden pb-8 md:pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/55" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 pt-6 md:pt-0">
          <p className="text-sm md:text-base font-semibold tracking-wide text-white/90 mb-2 uppercase">
            India&apos;s leading travel app
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Book Flights, Hotels &amp; Holiday Packages
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-normal">
            Compare prices, grab deals, and plan your entire trip in one place.
          </p>
        </div>
      </section>

      {/* Search Widget Container */}
      <div className="px-3 sm:px-4 mb-16 md:mb-20">
        <SearchWidget />
      </div>

      {/* Features Section */}
      <section className="py-14 bg-white border-t border-[#ebebeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a seamless booking experience with exclusive benefits for our travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                title: "Extensive Options",
                desc: "Access to over 1 million hotels and flights worldwide."
              },
              {
                icon: ShieldCheck,
                title: "Secure Booking",
                desc: "Your payments and personal data are protected with bank-level security."
              },
              {
                icon: CheckCircle2,
                title: "24/7 Support",
                desc: "Our dedicated support team is here to help you anytime, anywhere."
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 rounded-xl bg-[#f8f8f8] hover:bg-white hover:shadow-lg transition-all duration-300 border border-[#ebebeb]">
                <div className="w-14 h-14 bg-mmt-50 rounded-xl flex items-center justify-center mb-6 text-mmt-500">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 md:py-20 bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trending Destinations
              </h2>
              <p className="text-lg text-gray-600">
                Most loved destinations by our community
              </p>
            </div>
            <Link to="/destinations">
              <Button variant="outline" className="hidden md:flex">
                View All Destinations <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse h-96">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  </div>
                </div>
              ))
            ) : (
              featuredDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destinations/${destination.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e8e8e8]"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={destination.images[0]}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-mmt-500 transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {destination.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500 uppercase font-semibold">Starting from</span>
                        <div className="text-lg font-bold text-mmt-500">${destination.estimatedBudget.budget.toLocaleString('en-US')}</div>
                      </div>
                      <Button size="sm" variant="secondary" className="group-hover:bg-mmt-50 group-hover:text-mmt-500">
                        Explore
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-mmt-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl md:text-5xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-semibold text-white/85 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered their perfect destinations with our intelligent travel platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                Start Planning Now
              </Button>
            </Link>
            <Link to="/destinations">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg">
                <TrendingUp className="w-5 h-5 mr-2" />
                Explore Popular
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
