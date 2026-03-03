import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
          Hi, I'm <span className="text-primary">Your Name</span>
        </h1>
        <h2 className="text-2xl font-semibold text-muted-foreground md:text-3xl">
          Full Stack Developer & Designer
        </h2>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          I craft beautiful, functional, and user-centric digital experiences.
          Specializing in modern web technologies and passionate about creating
          impactful solutions.
        </p>
        <div className="flex gap-4 mt-6">
          <Button size="lg" asChild>
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
        <Link href="#about" className="mt-12 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </Link>
      </div>
    </section>
  );
}
