"use client"
import Link from "next/link"
import { Home } from "lucide-react";

export const Header = () => {
    return (<>
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50" role="navigation"  aria-label="Main navigation" >
            <div className="container">
                <div className="flex items-center gap-8  h-16">
                    <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-lg no-underline"
                        aria-label="Housing Price Estimator home" >
                        <Home size={22}  aria-hidden="true" />
                        Housing Price Predict
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/estimator" className="text-sm font-medium text-slate-600 hover:text-indigo-600 no-underline"  >
                            Estimator
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </>)
}