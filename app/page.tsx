

import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function HomePage() {
  return (
    <div className="container py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-slate-900 mb-4">Predict House Property Prices </h1>
        <p className="text-slate-500 text-lg mb-8"> Enter your property details and get the price estimate. </p>
        <Link href="/estimator" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
            text-white font-medium px-6 py-3 rounded-lg no-underline" aria-label="Go to property estimator">
          Get Started
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

