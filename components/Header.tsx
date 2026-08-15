import Link from "next/link";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import Image from "next/image";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";
import { PricingModal } from "@/components/PricingModel";
import { PLANS } from "@/lib/constants";
import type { Plan } from "@/types/plans";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 md:h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="mx-auto flex flex-col md:flex-row h-full max-w-7xl items-center justify-between px-4 sm:px-6 py-2 md:py-0">
        
        {/* Row 1: Logo + User actions on Mobile, normal left side on Desktop */}
        <div className="flex w-full md:w-auto items-center justify-between h-12 md:h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image
              src="/logo-short.png"
              alt="Kiln"
              width={32}
              height={32}
              className="h-8 w-auto md:hidden"
            />
            <Image
              src="/logo-kiln.png"
              alt="Kiln"
              width={100}
              height={100}
              className="h-9 w-auto hidden md:block"
            />
          </Link>

          {/* Right side items for Mobile view */}
          <div className="flex md:hidden items-center gap-3">
            <Show when="signed-in">
              <Link
                href="/projects"
                className="text-[12px] font-semibold text-white/60 transition-colors hover:text-white"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Projects
              </Link>

              {user && (
                <PricingModal>
                  <span className="inline-flex h-8 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 text-[10px] text-white/70">
                    <Zap className="h-3 w-3 fill-white/70" />
                    <span>{user.credits} / {PLANS[user?.plan as Plan]?.credits}</span>
                  </span>
                </PricingModal>
              )}

              <UserButton />
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[12px] font-semibold text-white/50 hover:text-white/90 hover:bg-transparent"
                >
                  Sign in
                </Button>
              </SignInButton>
            </Show>
          </div>
        </div>

        {/* Navigation Options: centered below on mobile, absolute centered on desktop */}
        <div className="flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center gap-6 sm:gap-4 lg:gap-6 xl:gap-10 h-8 md:h-full">
          <Link
            href="/#features"
            className="text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] font-semibold text-white/60 transition-colors hover:text-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] font-semibold text-white/60 transition-colors hover:text-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            How it works
          </Link>
          <Link
            href="/#pricing"
            className="text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] font-semibold text-white/60 transition-colors hover:text-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Pricing
          </Link>
        </div>

        {/* Right side items for Desktop view */}
        <div className="hidden md:flex items-center gap-3 sm:gap-5">
          <Show when="signed-in">
            <Link
              href="/projects"
              className="text-[13px] font-semibold text-white/60 transition-colors hover:text-white"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Projects
            </Link>

            {user && (
              <PricingModal>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70">
                  <Zap className="h-3 w-3 fill-white/70" />
                  <span>{user.credits} / {PLANS[user?.plan as Plan]?.credits} credits</span>
                </span>
              </PricingModal>
            )}

            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-medium text-white/50 hover:text-white/90 hover:bg-transparent"
              >
                Sign in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button
                size="sm"
                className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-black hover:bg-white/90 active:scale-95"
              >
                Get Started
                <ArrowRight className="h-3 w-3 opacity-60" />
              </Button>
            </SignInButton>
          </Show>
        </div>

      </nav>
    </header>
  );
}