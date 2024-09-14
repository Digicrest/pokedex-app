// src/components/TextToSpeech.tsx
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

interface Props {
    text: string;
}

export const TextToSpeech: React.FC<Props> = ({ text }) => {
    const [speaking, setSpeaking] = useState(false);

    const speak = () => {
        if (!speaking) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setSpeaking(true);
        } else {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    };

    return (
        <IconButton onClick={speak} color="primary">
            {speaking ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
    );
};
