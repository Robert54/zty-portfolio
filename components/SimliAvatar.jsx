"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { SimliClient } from "simli-client";
import { motion } from "framer-motion";

let vapi = null;
let simliClient = null;

const SimliAvatar = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const isInitialized = useRef(false);

  const initializeSimliClient = useCallback(() => {
    if (videoRef.current && audioRef.current && !isInitialized.current) {
      const SimliConfig = {
        apiKey: process.env.NEXT_PUBLIC_SIMLI_API_KEY,
        faceID: process.env.NEXT_PUBLIC_SIMLI_FACE_ID,
        handleSilence: false,
        videoRef: videoRef,
        audioRef: audioRef,
      };

      if (!simliClient) {
        simliClient = new SimliClient();
      }
      simliClient.Initialize(SimliConfig);
      console.log("Simli Client initialized");
    }
  }, []);

  const muteVapiInternalAudio = useCallback(() => {
    const audioElements = document.getElementsByTagName("audio");
    for (let i = 0; i < audioElements.length; i++) {
      if (audioElements[i].id !== "simli_audio") {
        audioElements[i].muted = true;
      }
    }
  }, []);

  const getAudioElementAndSendToSimli = useCallback(() => {
    if (simliClient) {
      muteVapiInternalAudio();
      try {
        const dailyCall = vapi.getDailyCallObject();
        const participants = dailyCall?.participants();
        if (participants) {
          Object.values(participants).forEach((participant) => {
            const audioTrack = participant.tracks.audio.track;
            if (audioTrack) {
              console.log(`Audio track for ${participant.user_name}:`, audioTrack);
            }
            if (participant.user_name === "Vapi Speaker") {
              console.log("Vapi Speaker detected");
              simliClient.listenToMediastreamTrack(audioTrack);
            }
          });
        }
      } catch (error) {
        console.error("Error getting audio track:", error);
      }
    } else {
      setTimeout(getAudioElementAndSendToSimli, 10);
    }
  }, [muteVapiInternalAudio]);

  const eventListenerVapi = useCallback(() => {
    if (!vapi) {
      vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    }
    
    vapi.on("message", (message) => {
      console.log("Vapi message:", message);
      if (
        message.type === "speech-update" &&
        message.status === "started" &&
        message.role === "user"
      ) {
        console.log("User started speaking");
        simliClient.ClearBuffer();
      }
    });

    vapi.on("call-start", () => {
      console.log("Vapi call started");
      setIsAvatarVisible(true);
      getAudioElementAndSendToSimli();
    });

    vapi.on("call-end", () => {
      console.log("Vapi call ended");
      setIsAvatarVisible(false);
    });
  }, [getAudioElementAndSendToSimli]);

  const startVapiInteraction = useCallback(async () => {
    try {
      if (!vapi) {
        vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
      }
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_AGENT_ID);
      console.log("Vapi interaction started");
      eventListenerVapi();
    } catch (error) {
      console.error("Error starting Vapi:", error);
      setError(`Error starting Vapi: ${error.message}`);
    }
  }, [eventListenerVapi]);

  const eventListenerSimli = useCallback(() => {
    if (simliClient) {
      simliClient.on("connected", () => {
        console.log("SimliClient connected");
        const audioData = new Uint8Array(6000).fill(0);
        simliClient.sendAudioData(audioData);
        startVapiInteraction();
        console.log("Sent initial audio data");
      });

      simliClient.on("disconnected", () => {
        console.log("SimliClient disconnected");
        if (vapi) vapi.stop();
      });
    }
  }, [startVapiInteraction]);

  const handleStart = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      initializeSimliClient();

      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start Simli client
      await simliClient?.start();
      eventListenerSimli();
    } catch (error) {
      console.error("Error starting interaction:", error);
      setError(`Error starting interaction: ${error.message}`);
      setIsLoading(false);
    }
  }, [eventListenerSimli, initializeSimliClient]);

  const cleanup = useCallback(() => {
    if (vapi) {
      vapi.removeAllListeners();
      vapi.stop();
      vapi = null;
    }
    if (simliClient) {
      simliClient.close();
      simliClient = null;
    }
    isInitialized.current = false;
    setIsAvatarVisible(false);
    setIsLoading(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      handleStart();
    }
    return cleanup;
  }, [cleanup, handleStart, isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full"
    >
      <div className="relative w-full h-full">
        {isLoading && !isAvatarVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
          </div>
        )}
        <div className={`w-full h-full ${!isAvatarVisible ? 'hidden' : ''}`}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            id="simli_video"
            className="w-full h-full object-cover rounded-full"
          />
          <audio ref={audioRef} autoPlay id="simli_audio" />
        </div>
        <button 
          onClick={cleanup}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default SimliAvatar; 
