import { Button } from "@/components/ui/button"
import { MessageCircle, Users, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <Navbar />

			<main className="flex-1">
				{/* Hero Section */}
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center space-y-8 text-center">
							<div className="space-y-4 max-w-3xl">
								<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
										Rencontrez des personnes fascinantes
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
									Découvrez de nouvelles perspectives, partagez vos idées et créez des connexions authentiques avec des
									inconnus du monde entier.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}