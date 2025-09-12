import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-80 border-t border-border bg-accent-white">
      <div className="mx-auto max-w-1200 w-full px-24 py-32 grid gap-24 md:grid-cols-3">
        <div className="space-y-8">
          <div className="text-title-h5 text-accent-black">Localhowl</div>
          <p className="text-body-medium text-black-alpha-64">
            Make your website AI-ready.
          </p>
        </div>
        <div className="space-y-6">
          <div className="text-label-large text-accent-black">Product</div>
          <div className="grid gap-4 text-body-medium">
            <Link href="/features" className="hover:underline">Features</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/docs" className="hover:underline">Docs</Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="text-label-large text-accent-black">Company</div>
          <div className="grid gap-4 text-body-medium">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-16 text-center text-body-small text-black-alpha-64">
        © {new Date().getFullYear()} Localhowl. All rights reserved.
      </div>
    </footer>
  );
}
