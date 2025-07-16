"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            className="absolute w-full h-full object-cover"
            src="https://www.youtube.com/embed/wViaZrGMzoI?autoplay=1&mute=1&loop=1&controls=0&playlist=wViaZrGMzoI"
            title="YouTube video background"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 dark:from-black/90 dark:to-black/70"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-gray-100 dark:to-white">
              Code the Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 dark:text-gray-400">
              Join the next generation of competitive programming
            </p>
            <Link
              href="/user-dashboard"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Challenges",
                description:
                  "Compete in live coding challenges against developers worldwide",
                icon: "🚀",
              },
              {
                title: "Advanced Analytics",
                description:
                  "Track your progress with detailed performance metrics",
                icon: "📊",
              },
              {
                title: "Team Collaboration",
                description: "Form teams and solve problems together",
                icon: "👥",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
              Join thousands of developers who are already part of our community
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-full border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
