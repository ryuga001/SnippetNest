import Hero from '@/components/Hero';
import SnippetCard from '@/components/template_card';
import { Button } from '@/components/ui/button';
import { featuredSnippets } from '@/lib/data';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>

      {/* Featured Snippets Section */}
      <section className="py-20 bg-gray-300">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Snippets</h2>
            <Link href="/snippets">
              <Button variant="ghost">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSnippets.map((snippet: any) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Generator Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Not finding what you need?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let our AI create a custom snippet tailored to your specific requirements.
              Just describe what you need, and we'll generate it for you.
            </p>
            <Link href="/ai-generator">
              <Button size="lg" className="gap-2">
                Try AI Generator
                <Sparkles className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-lg border bg-card text-card-foreground">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The snippets are not only helpful but also incredibly easy to integrate.
                  Saved me hours of coding!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10" />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Web Developer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
