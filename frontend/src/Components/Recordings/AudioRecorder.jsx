import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react"
function AudioRecorder({ onAudioSubmit, timeLimit = 60 }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingComplete(false);

      // Start timer
      timerRef.current = setInterval(() => {
        setElapsedTime(prevTime => {
          if (prevTime + 1 >= timeLimit) {
            stopRecording(); // Stop when reaching the time limit
          }
          return prevTime + 1;
        });
      }, 1000);

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        audioChunksRef.current = [];
        setRecordingComplete(true);
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setElapsedTime(0);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (audioBlob) {
      onAudioSubmit(audioBlob);
    }
  };

  const handleReset = () => {
    setAudioBlob(null);
    setRecordingComplete(false);
    setElapsedTime(0);
  };

  return (
    <div className="audio-recorder max-w-xl mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-800">
      {/* <h2 className="text-2xl font-semibold text-center mb-6">Audio Recorder</h2> */}

      <div className="flex flex-col items-center mb-6">
        {isRecording && (
          <div className="recording-info mb-4">
            <div className="listening-animation flex items-center gap-2 mb-2">
              <div className="animate-ping h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="animate-ping h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="animate-ping h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="ml-2 text-blue-500 font-semibold">Listening...</span>
            </div>
            <div className="timer text-lg font-semibold text-gray-600">
              Recording Time: <span className="text-blue-500">{formatTime(elapsedTime)}</span>
            </div>
            <div className="remaining-time text-md text-red-500">
              <Clock className="w-5 h-5 text-blue-600 inline-block mr-2" />
              Time Left: {formatTime(timeLimit - elapsedTime)}
            </div>
          </div>
        )}


        <div class="flex items-center justify-center ">
          <div class="relative group">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="relative inline-block font-semibold leading-6 text-white cursor-pointer rounded-xl shadow-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 p-[2px]"
            >
              <span
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              ></span>

              <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div class="relative z-10 flex items-center space-x-2">
                  <span class="transition-all duration-500 group-hover:translate-x-1"
                  > {isRecording ? "Stop Recording" : "Start Recording"}</span>
                  <svg
                    class="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                    data-slot="icon"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
            </button>
          </div>
        </div>


      </div>

      {audioBlob && (
        <div className="audio-playback mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">Recorded Audio:</h3>
          <audio controls src={URL.createObjectURL(audioBlob)} className="w-full rounded-lg border border-gray-300"></audio>
        </div>
      )}

      <div className="actions mt-6 flex flex-col items-center gap-4">
        {recordingComplete && (
          // <button

          //   className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          // >

          // </button>

          /* From Uiverse.io by elijahgummer */
          <button
            onClick={handleSubmit}
            class="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex"
          >
            <div class="flex items-center">
              <span class="ml-1 text-white lg:inline p-1">  Submit Audio</span>
            </div>
            <div class="ml-2 flex items-center gap-1 text-sm md:flex">
              <svg
                class="size-4 text-gray-500 transition-all duration-200 group-hover:text-yellow-300"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <span
                class="inline-block tabular-nums tracking-wider font-display font-medium text-black dark:text-white"
              >11</span
              >
            </div>
          </button>

        )}
        {audioBlob && recordingComplete && (

          /* From Uiverse.io by elijahgummer */
          <button
            onClick={handleReset}
            class="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
          >
            <span
              class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
            ></span>
            <div class="flex items-center">

              <span class="ml-1 text-white"> Re-record</span>
            </div>



          </button>


        )}
      </div>
    </div>
  );
}

export default AudioRecorder;
