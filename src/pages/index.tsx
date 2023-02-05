import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Typewriter from 'typewriter-effect';
import ResizablePanel from '../components/ResizablePanel';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [generatedBios, setGeneratedBios] = useState<String>('');
  const [typewriter, setTypewriter] = useState(true);

  console.log('Streamed response: ', generatedBios);

  const prompt =
    'Explain the following to me like I am 5 years old. Give me an example like if I were a 5 year old. The prompt is: ' +
    bio +
    '.';

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios('');
    setLoading(true);
    setTypewriter(false);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    // <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
    // <Head>
    //   <title>Twitter Generator</title>
    //   <link rel="icon" href="/favicon.ico" />
    // </Head>

    // <Header />
    //   <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
    //     <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold ">
    //       Get an explanation like you&apos;re 5 years old.
    //     </h1>

    //     <div className="max-w-xl w-full">
    //       {/* <textarea
    //         value={bio}
    //         onChange={(e) => setBio(e.target.value)}
    //         rows={4}
    //         className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
    //         placeholder={
    //           'e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com.'
    //         }
    //       /> */}
    //       <div className="grid w-full gap-2 mt-4">
    //         <Label htmlFor="message-2">Your Message</Label>
    //         <Textarea
    //           onChange={(e) => setBio(e.target.value)}
    //           placeholder="Example: Grand Unification Theory"
    //         />
    //         <p className="text-sm text-slate-500">
    //           Your message will be copied to the support team.
    //         </p>
    //         <Button onClick={(e) => generateBio(e)}>Send message</Button>
    //       </div>

    //       {/* <div className="flex mb-5 items-center space-x-3">
    //         <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
    //         <p className="text-left font-medium">Select your vibe.</p>
    //       </div> */}
    //       <div className="block">
    //         {/* <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} /> */}
    //       </div>

    //       {!loading && (
    //         <button
    //           className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
    //           onClick={(e) => generateBio(e)}
    //         >
    //           Generate your bio &rarr;
    //         </button>
    //       )}
    //       {loading && (
    //         <button
    //           className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
    //           disabled
    //         >
    //           <LoadingDots color="white" style="large" />
    //         </button>
    //       )}
    //     </div>
    //     <Toaster
    //       position="top-center"
    //       reverseOrder={false}
    //       toastOptions={{ duration: 2000 }}
    //     />
    //     <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
    //     <ResizablePanel>
    //       <AnimatePresence mode="wait">
    //         <motion.div className="space-y-10 my-10">
    //           {generatedBios && (
    //             <>
    //               <div>
    //                 <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
    //                   Your generated bios
    //                 </h2>
    //               </div>
    //               <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
    //                 {generatedBios
    //                   .substring(generatedBios.indexOf('1') + 3)
    //                   .split('2.')
    //                   .map((generatedBio) => {
    //                     return (
    //                       <div
    //                         className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
    //                         onClick={() => {
    //                           navigator.clipboard.writeText(generatedBio);
    //                           toast('Bio copied to clipboard', {
    //                             icon: '✂️',
    //                           });
    //                         }}
    //                         key={generatedBio}
    //                       >
    //                         <p>{generatedBio}</p>
    //                       </div>
    //                     );
    //                   })}
    //               </div>
    //             </>
    //           )}
    //         </motion.div>
    //       </AnimatePresence>
    //     </ResizablePanel>
    //   </main>
    //   <Footer />
    // </div>
    <div className="">
      <Head>
        <title>ExplainerGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="lg:flex sm:block min-h-screen">
        {/* COL 1 */}
        <div className="lg:w-1/2 sm:w-full p-4 bg-gray-200 dark:bg-[#111111]">
          <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
            <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold ">
              Explain anything like you&apos;re 5 years old
            </h1>

            <div className="max-w-xl w-full">
              {/* <textarea
             value={bio}
             onChange={(e) => setBio(e.target.value)}
             rows={4}
             className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
             placeholder={
               'e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com.'
             }
           /> */}
              <div className="grid w-full gap-2 mt-8">
                <Label htmlFor="message-2">
                  What would you like to explain?
                </Label>
                <Textarea
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Example: Grand Unification Theory"
                />

                {!loading && (
                  <Button className="mt-12" onClick={(e) => generateBio(e)}>
                    Generate Explanation
                  </Button>
                )}
                {loading && (
                  <Button className="mt-12" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating explanation
                  </Button>
                )}
              </div>

              {/* {!loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                  onClick={(e) => generateBio(e)}
                >
                  Generate your bio &rarr;
                </button>
              )}
              {loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                  disabled
                >
                  <LoadingDots color="white" style="large" />
                </button>
              )} */}
            </div>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
          </main>
        </div>
        {/* COL 2 */}
        <div className="lg:w-1/2 sm:w-full p-4 bg-gray-300 dark:bg-[#1d1d1d]">
          {!loading && typewriter && (
            <h1 className="sm:text-3xl text-xl max-w-2xl font-bold text-center mt-12">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      'Grand unification theory is like when you put all of the pieces of a puzzle together. It is when scientists try to make sense of how all of the different parts of the universe fit together and work together. For example, if you were a 5 year old and you had a puzzle of a dragon, you would need to find all of the pieces and put them together to make a complete picture. That is kind of like what grand unification theory does, except with pieces of the universe.'
                    )
                    .pauseFor(2500)
                    .deleteAll()

                    .start();
                }}
              />
            </h1>
          )}
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="space-y-10 my-10">
                {generatedBios && (
                  <>
                    <div>
                      <h2 className="sm:text-4xl text-3xl font-bold  mx-auto">
                        Your explanation:
                      </h2>
                    </div>
                    <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                      {generatedBios
                        .substring(generatedBios.indexOf('1') + 3)
                        .split('2.')
                        .map((generatedBio) => {
                          return (
                            <div
                              className="bg-white dark:bg-[#303030] rounded-xl shadow-md p-4 hover:bg-gray-100 dark:hover:bg-[#303030]/80 transition cursor-copy border"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedBio);
                                toast('Bio copied to clipboard', {
                                  icon: '✂️',
                                });
                              }}
                              key={generatedBio}
                            >
                              <p>{generatedBio}</p>
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
