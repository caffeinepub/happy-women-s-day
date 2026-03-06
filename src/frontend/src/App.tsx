import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ============================================================
// PEOPLE DATA
// ============================================================
interface PersonData {
  id: string;
  name: string;
  avatar: string;
  showHeart: boolean;
  tagline: string;
  message: string;
}

const PEOPLE: PersonData[] = [
  {
    id: "mom",
    name: "Mom",
    avatar: "/assets/generated/avatar-mom-transparent.dim_400x400.png",
    showHeart: true,
    tagline: "My everything 💕",
    message: `Dear Mom,

On this Women's Day, I want you to know that everything I am, everything I have, everything I will ever become — is because of you.

You raised us alone. Not with half a heart, but with everything you had — your strength, your tears, your prayers, your sleepless nights, your hands that never stopped working. You were our mother AND our father. You were our safe place when the world felt too big, and our push when we needed to keep going.

I have watched you carry weights that would break most people, and you never once let us see you give up. You smiled for us. You cooked for us. You fought for us. You sacrificed dreams that were yours so that ours could bloom. And they are blooming, Mom. Because of you.

Every small thing you did — packing lunches, attending school events alone, staying up worrying, praying in the early mornings — I see it all now. I understand it all now. And it fills my heart with so much love and gratitude that words honestly fall short.

You are not just a mother. You are a warrior. A queen. The most powerful woman I have ever known.

Happy Women's Day, Mom. Today and every day, this day is yours. You earned it more than anyone.

I love you more than I could ever say.

With all my love, always,
Kury 💗`,
  },
  {
    id: "thu",
    name: "Ms Thu",
    avatar: "/assets/generated/avatar-thu-transparent.dim_400x400.png",
    showHeart: false,
    tagline: "Strength beyond measure",
    message: `Dear Ms Thu,

Happy Women's Day to one of the most remarkable women I have ever had the honour of knowing.

You are a self-made woman in the truest sense of the word. Life has not always been gentle with you — you have faced difficulties that tested your spirit, your resilience, and your faith. And yet, here you stand. Unbroken. Graceful. Strong.

What you have done for our family during the tough times is something I will carry in my heart forever. You showed up. You were there. You brought warmth and care even when you had your own battles to fight. That kind of generosity is rare, and it means more than you know.

You are proof that a woman can face the hardest storms and still come out shining. Your journey — every struggle, every sacrifice, every step forward — is an inspiration.

Thank you for being you. Thank you for being part of our story.

Wishing you a beautiful Women's Day filled with all the love and joy you so freely give to others.

With love and deep respect,
Kury 🌸`,
  },
  {
    id: "vaishna",
    name: "Vaishna",
    avatar: "/assets/generated/avatar-vaishna-transparent.dim_400x400.png",
    showHeart: true,
    tagline: "Superwoman in disguise 💪",
    message: `Dear Vaishna,

Happy Women's Day to one of the most hardworking, determined, and amazing people I know!

Honestly, I don't know how you do it. You manage your family, show up for your career every single day, AND you're preparing to go study in Australia — like, excuse me, who does all three at once?! YOU do. Because you're built different.

You are the kind of woman who doesn't wait for things to happen — you make them happen. Quietly, steadily, with that focused energy that makes everyone around you want to work harder too.

The Australia chapter is going to be incredible. New places, new experiences, new versions of you waiting to be discovered — and you are so ready for it. All that hard work is about to take you places you've only dreamed of.

Keep going. Keep shining. The best is still ahead of you, and I can't wait to cheer you on every step of the way.

With so much love and pride,
Kury 💗`,
  },
  {
    id: "gita",
    name: "Sis Gita",
    avatar: "/assets/generated/avatar-gita-transparent.dim_400x400.png",
    showHeart: false,
    tagline: "My day-one soul sister 🌟",
    message: `Dear Sis Gita,

Happy Women's Day to one of the purest, most genuine souls I have ever met in my life.

From the very first day of college, you were there. And that means everything. You didn't just become a friend — you became someone who taught me how to be a better person. How to be kind. How to be patient. How to show up for people. I learned so much just by watching you.

Whatever the matter — big or small, silly or serious — you've always been there to listen. Without judgment. Without making me feel small. Just... there. That kind of friendship is something I treasure more than words can say.

And now, GATE and everything ahead — I just want you to know: you've got this. You study hard, you give your best, and I am rooting for you with everything I have. I am there, always. No matter what happens, no matter where life takes us both.

Thank you for being my day-one. Thank you for being you.

Lots of love always,
Kury 🌸`,
  },
  {
    id: "gargee",
    name: "Sis Gargee",
    avatar: "/assets/generated/avatar-gargee-transparent.dim_400x400.png",
    showHeart: false,
    tagline: "A genuinely good soul",
    message: `Dear Sis Gargee,

Happy Women's Day to one of the best people who walked into my life from second year onwards!

First things first — THANK YOU for being my personal Uber from 2nd year. Honestly, I owe you so many rides. You are a certified legend and I will never forget it 😄

But jokes aside — you are one of the purest souls I know. You helped me so much, in ways big and small, and you did it with the biggest heart. The world is genuinely a better place with you in it.

And now — SWEDEN! How cool is that?! New adventure, new country, new chapter. Yes, it'll be different. Yes, it'll feel big. But you are ready for it. And no matter how far you go, the people who matter will always be just a message away.

Explore everything. Embrace the new. And know that we are cheering for you from right here.

Study hard, shine bright, and come back with the best stories!

With so much love,
Kury 🌸`,
  },
];

// ============================================================
// CONFETTI COMPONENT
// ============================================================
interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "rect" | "circle" | "star";
  rotation: number;
}

const CONFETTI_COLORS = [
  "oklch(0.65 0.22 350)",
  "oklch(0.80 0.16 82)",
  "oklch(0.70 0.18 295)",
  "oklch(0.75 0.20 330)",
  "oklch(0.85 0.14 60)",
  "oklch(0.60 0.22 310)",
  "oklch(0.90 0.12 85)",
];

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 10,
    duration: 2.5 + Math.random() * 2.5,
    delay: Math.random() * 1.5,
    shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
    rotation: Math.random() * 360,
  }));
}

function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      setPieces(generateConfetti(80));
      const timer = setTimeout(() => setPieces([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!pieces.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width:
              p.shape === "circle"
                ? p.size
                : p.shape === "star"
                  ? p.size * 1.2
                  : p.size * 0.7,
            height:
              p.shape === "circle"
                ? p.size
                : p.shape === "rect"
                  ? p.size * 2
                  : p.size * 1.2,
            backgroundColor: p.shape !== "star" ? p.color : "transparent",
            borderRadius:
              p.shape === "circle" ? "50%" : p.shape === "rect" ? "2px" : "0",
            background: p.shape === "star" ? "none" : p.color,
            boxShadow: p.shape === "star" ? `0 0 0 2px ${p.color}` : "none",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// FLOATING BACKGROUND ELEMENTS
// ============================================================
interface FloatingElement {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  isPetal: boolean;
}

function FloatingBackground() {
  const elements = useRef<FloatingElement[]>(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 12 + Math.random() * 24,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -20,
      opacity: 0.15 + Math.random() * 0.35,
      isPetal: i % 3 === 0,
    })),
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {elements.current.map((el) => (
        <div
          key={el.id}
          className={el.isPetal ? "floating-petal" : "floating-heart"}
          style={{
            left: `${el.x}%`,
            bottom: "-60px",
            fontSize: `${el.size}px`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
            opacity: el.opacity,
          }}
        >
          {el.isPetal ? "🌸" : "💗"}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ORBITING HEARTS (for Mom & Vaishna)
// ============================================================
function OrbitingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <span className="orbiting-heart-1 text-xl">💗</span>
      <span className="orbiting-heart-2 text-lg">💕</span>
      <span className="orbiting-heart-3 text-base">❤️</span>
    </div>
  );
}

// ============================================================
// SPARKLE DECORATION
// ============================================================
function Sparkles({ count = 6 }: { count?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
          key={i}
          className="sparkle absolute text-lg"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: `${10 + Math.random() * 14}px`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

// ============================================================
// PERSON CARD
// ============================================================
function PersonCard({
  person,
  index,
  onSelect,
}: {
  person: PersonData;
  index: number;
  onSelect: (person: PersonData) => void;
}) {
  return (
    <motion.article
      data-ocid={`person.card.${index + 1}`}
      className="person-card glass-card rounded-3xl overflow-hidden shadow-card flex flex-col items-center gap-4 p-6 relative"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.15 * index,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      aria-label={`Open message for ${person.name}`}
    >
      {/* Heart badge for Mom & Vaishna */}
      {person.showHeart && (
        <div className="absolute top-3 right-3 z-10">
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            💗
          </motion.span>
        </div>
      )}

      {/* Avatar */}
      <div className="relative w-36 h-36 flex-shrink-0">
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.12 340) 0%, oklch(0.80 0.14 310) 100%)",
          }}
        >
          <img
            src={person.avatar}
            alt={`${person.name} avatar`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: person.showHeart
              ? "0 0 0 3px oklch(0.80 0.16 82 / 0.6), 0 0 20px oklch(0.65 0.22 350 / 0.3)"
              : "0 0 0 3px oklch(0.65 0.22 350 / 0.4), 0 0 16px oklch(0.65 0.22 350 / 0.2)",
          }}
        />
      </div>

      {/* Name & tagline */}
      <div className="text-center">
        <h3
          className="script-heading text-2xl font-bold"
          style={{ color: "oklch(0.38 0.16 330)" }}
        >
          {person.name}
        </h3>
        <p
          className="text-sm mt-1 font-medium"
          style={{ color: "oklch(0.55 0.12 330)" }}
        >
          {person.tagline}
        </p>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        data-ocid={`person.open_modal_button.${index + 1}`}
        className="btn-shimmer w-full rounded-2xl py-3 px-5 text-sm font-semibold mt-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(person);
        }}
      >
        Open your message 💌
      </button>
    </motion.article>
  );
}

// ============================================================
// LANDING PAGE
// ============================================================
function LandingPage({ onSelect }: { onSelect: (person: PersonData) => void }) {
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiActive(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      data-ocid="landing.section"
      className="womens-day-bg noise-overlay min-h-screen relative flex flex-col"
    >
      <FloatingBackground />
      <Confetti active={confettiActive} />

      <div className="relative z-10 flex flex-col items-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 flex-1">
        {/* Header */}
        <header className="text-center mb-12 max-w-2xl">
          {/* Decorative top */}
          <motion.div
            className="text-4xl mb-4 flex justify-center gap-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            🌸✨🌺
          </motion.div>

          <motion.h1
            className="script-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            style={{ color: "oklch(0.38 0.20 335)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Happy Women's Day
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            className="gold-divider max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-xl sm:text-2xl font-medium mt-4"
            style={{ color: "oklch(0.48 0.14 330)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A little something, made with love 💕
          </motion.p>

          <motion.p
            className="text-base mt-3 font-medium"
            style={{ color: "oklch(0.58 0.10 330)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Choose someone special below 👇
          </motion.p>
        </header>

        {/* Person Cards Grid */}
        <main className="w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {PEOPLE.map((person, index) => (
              <PersonCard
                key={person.id}
                person={person}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="gold-divider max-w-sm mx-auto" />
          <p className="text-sm mt-3" style={{ color: "oklch(0.55 0.08 330)" }}>
            © {new Date().getFullYear()}. Built with{" "}
            <span className="text-base">❤️</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: "oklch(0.55 0.18 350)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
}

// ============================================================
// MESSAGE PAGE
// ============================================================
function MessagePage({
  person,
  onBack,
}: {
  person: PersonData;
  onBack: () => void;
}) {
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiActive(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Parse message into paragraphs
  const paragraphs = person.message
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  // Find signature (last paragraph if starts with "With")
  const signatureIndex = paragraphs.findIndex((p) =>
    p.trim().startsWith("With"),
  );
  const bodyParagraphs =
    signatureIndex > -1 ? paragraphs.slice(0, signatureIndex) : paragraphs;
  const signature = signatureIndex > -1 ? paragraphs[signatureIndex] : null;

  return (
    <section
      data-ocid="message.section"
      className="message-bg noise-overlay min-h-screen relative flex flex-col"
    >
      <FloatingBackground />
      <Confetti active={confettiActive} />

      <div className="relative z-10 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col items-center flex-1">
        {/* Back Button */}
        <div className="w-full mb-6">
          <motion.button
            data-ocid="message.back_button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: "oklch(0.99 0.008 330 / 0.7)",
              color: "oklch(0.42 0.18 335)",
              backdropFilter: "blur(12px)",
              border: "1px solid oklch(0.85 0.08 340)",
            }}
            onClick={onBack}
            whileHover={{ scale: 1.04, x: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            ← Back
          </motion.button>
        </div>

        {/* Avatar Section */}
        <motion.div
          className="relative mb-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.1,
          }}
        >
          {/* Orbiting hearts for special people */}
          {person.showHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <OrbitingHearts />
            </div>
          )}

          {/* Avatar with glow */}
          <div className="relative">
            <div
              className="w-44 h-44 rounded-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.88 0.12 340) 0%, oklch(0.78 0.16 310) 100%)",
                boxShadow: person.showHeart
                  ? "0 0 0 4px oklch(0.80 0.16 82 / 0.7), 0 8px 40px oklch(0.58 0.22 350 / 0.4), 0 0 60px oklch(0.80 0.14 295 / 0.3)"
                  : "0 0 0 4px oklch(0.65 0.22 350 / 0.5), 0 8px 40px oklch(0.58 0.22 350 / 0.35), 0 0 50px oklch(0.80 0.14 295 / 0.25)",
              }}
            >
              <img
                src={person.avatar}
                alt={`${person.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sparkles around avatar */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static decorative sparkles
                  key={i}
                  className="absolute text-sm"
                  style={{
                    top: `${-10 + i * 25}%`,
                    left: `${i % 2 === 0 ? -20 : 110}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  ✨
                </motion.span>
              ))}
            </div>
          </div>

          {/* Name */}
          <motion.h1
            className="script-heading text-4xl sm:text-5xl font-bold mt-5 text-center"
            style={{ color: "oklch(0.35 0.18 335)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {person.name}
          </motion.h1>

          <motion.div
            className="gold-divider w-40 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </motion.div>

        {/* Message Card */}
        <motion.div
          className="glass-card rounded-3xl p-7 sm:p-9 w-full shadow-card relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Sparkles count={4} />

          {/* Decorative quote mark */}
          <div
            className="absolute top-4 left-5 text-6xl leading-none pointer-events-none select-none font-serif"
            style={{ color: "oklch(0.65 0.22 350 / 0.12)" }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Message body */}
          <div className="message-text relative z-10">
            {bodyParagraphs.map((para, i) => (
              <motion.p
                // biome-ignore lint/suspicious/noArrayIndexKey: static ordered message paragraphs
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                style={{
                  whiteSpace: "pre-line",
                  marginBottom: i < bodyParagraphs.length - 1 ? "1.2em" : 0,
                  fontWeight: i === 0 ? 600 : 400,
                  color:
                    i === 0 ? "oklch(0.38 0.18 335)" : "oklch(0.22 0.05 330)",
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Divider */}
          {signature && (
            <>
              <div className="gold-divider my-5" />
              <motion.div
                className="text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <p
                  className="script-heading text-xl sm:text-2xl font-semibold italic"
                  style={{
                    color: "oklch(0.42 0.20 340)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {signature}
                </p>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Footer hearts */}
        <motion.div
          className="mt-8 text-3xl flex gap-3"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          🌸 💗 🌺
        </motion.div>

        {/* Footer */}
        <footer className="mt-8 text-center pb-6">
          <p className="text-xs" style={{ color: "oklch(0.58 0.08 330)" }}>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: "oklch(0.55 0.18 350)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const { actor, isFetching } = useActor();

  // Load backend as a readiness signal (content is hardcoded)
  useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPeople();
    },
    enabled: !!actor && !isFetching,
  });

  const handleSelect = useCallback((person: PersonData) => {
    setSelectedPerson(person);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedPerson(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {selectedPerson ? (
        <motion.div
          key={selectedPerson.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessagePage person={selectedPerson} onBack={handleBack} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onSelect={handleSelect} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
