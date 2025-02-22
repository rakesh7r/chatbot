'use client';
import { useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { GoogleGeminiEffect } from '../components/ui/google-gemini-effect';
import { useRouter } from 'next/navigation';
import { MoveUpRight } from 'lucide-react';

export default function GoogleGeminiEffectDemo() {
  const router = useRouter();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Cognito"
        buttonText="Try Cognito now"
        icon={<MoveUpRight size={20} />}
        description="Get instant answers and create structured content."
        btnClickHandler={() => {
          router.push('/chat');
        }}
      />
    </div>
  );
}
