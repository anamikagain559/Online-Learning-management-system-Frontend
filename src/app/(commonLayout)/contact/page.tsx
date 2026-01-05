// app/contact/page.tsx
"use client"; // needed for form interactivity

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can send the form data to your backend or email service
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have questions or want to work with us? Send us a message!
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="grid md:grid-cols-2 gap-12">
        {/* Info Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700">
            We’d love to hear from you. Reach out with any questions, feedback,
            or partnership opportunities.
          </p>
          <div className="space-y-3 text-gray-700">
            <p><strong>Email:</strong> contact@yourproject.com</p>
            <p><strong>Phone:</strong> +880 1234 567 890</p>
            <p><strong>Address:</strong> Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Form Section */}
        <div>
          {submitted && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
              Your message has been sent successfully!
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-50 p-6 rounded-lg shadow"
          >
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
