/*  ===========================================================================
*
*   This file is part of TRIBE DRUMS.
*   Copyright 2023 Jairo David Mendez Guzman
*
*   TRIBE DRUMS is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   TRIBE DRUMS is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with TRIBE DRUMS.  If not, see <http://www.gnu.org/licenses/>.
*
*   TRIBE DRUMS is based on the JUCE library using HISE Library,
*   which must be separately licensed for closed source applications:
*
*   http://www.juce.com
*
*   ===========================================================================
*/

//Mixer--------------------------------------------------------------------

const NUM_CHANNELS = 12;
const soloState = [];
const gainLevel = [];
const chFader= [];
const muteButton = [];
const soloButton = [];
const ChPan = [];


for (i = 0; i < NUM_CHANNELS; ++i)
{
    gainLevel.push(Synth.getEffect("Ch" + i));
        
    chFader.push(Content.getComponent("Fader" + i));
    chFader[i].setControlCallback(onchFaderControl);
    
    muteButton.push(Content.getComponent("Mute" + i));
    muteButton[i].setControlCallback(onmuteButtonControl);
    
    soloButton.push(Content.getComponent("Solo" + i));
    soloButton[i].setControlCallback(onsoloButtonControl);
    
    ChPan[i] = Content.getComponent("Pan" + i);
    ChPan[i].setControlCallback(onPanControl);

}

//Levels
inline function onchFaderControl(component, value)
{
    local index = chFader.indexOf(component);
    
    if ((!muteButton[index].getValue() && !soloState.contains(1)) || soloButton[index].getValue())
        gainLevel[index].setAttribute(gainLevel[index].Gain, value);
}

//Mute
inline function onmuteButtonControl(component, value)
{
    soloMuteProcess();
}

//Solo
inline function onsoloButtonControl(component, value)
{
    local index = soloButton.indexOf(component);
    
    soloState[index] = value;
    
    soloMuteProcess();
}

//Pan

inline function onPanControl(component, value)
{
	local index = ChPan.indexOf(component);
	
    gainLevel[index].setAttribute(gainLevel[index].Balance, value);
};




// Functions
inline function soloMuteProcess()
{
    for (i = 0; i < NUM_CHANNELS; i++)
    {
        if ((!soloState.contains(1) || soloButton[i].getValue()) && (!muteButton[i].getValue() || soloButton[i].getValue()))
            gainLevel[i].setAttribute(gainLevel[i].Gain, chFader[i].getValue());
        else
            gainLevel[i].setAttribute(gainLevel[i].Gain, -100);
    }
}

//Convolution Reverb
const var ConvolutionReverb = Synth.getAudioSampleProcessor("Convolution Reverb");
const var IRHide = Content.getComponent("IRHide");
const var IRLabel = Content.getComponent("IRLabel");

inline function onReverbTypeControl(component, value)
{
	if (value == 1)
	ConvolutionReverb.setFile("{PROJECT_FOLDER}ROM.wav");
	if (value == 2)
	ConvolutionReverb.setFile("{PROJECT_FOLDER}CHR.wav");
	if (value == 3)
	ConvolutionReverb.setFile("{PROJECT_FOLDER}PLT.wav");
	if (value == 4)
	ConvolutionReverb.setFile("{PROJECT_FOLDER}SPR.wav");
	if (value == 5)
	ConvolutionReverb.setFile("{PROJECT_FOLDER}NON.wav");
	if (value == 6)
	ConvolutionReverb.setFile("{PROJECT_FOLDER}DIG.wav");
	
	if (value == 7)
	{
		IRHide.showControl(false);
		IRLabel.showControl(true);	
	}
	else
	{
		IRHide.showControl(true);
		IRLabel.showControl(false);
	}
	
};

Content.getComponent("ReverbType").setControlCallback(onReverbTypeControl);

//NoteKiller

inline function onPanicButtonControl(component, value)
{
	Engine.allNotesOff();
};

Content.getComponent("PanicButton").setControlCallback(onPanicButtonControl);


inline function onPlayButtonControl(component, value)
{
	if(value == 1)
	Expansions.MIDIPlayer1.play(0);
	if(value == 0)
	Expansions.MIDIPlayer1.stop(0);
	
};

Content.getComponent("PlayButton").setControlCallback(onPlayButtonControl);


inline function onstopButtonControl(component, value)
{
	Expansions.MIDIPlayer1.stop(0);
};

Content.getComponent("stopButton").setControlCallback(onstopButtonControl);


//Sampler Pitch

const var SamplerPitchKnob = [];
const var SamplerPitch = [];

for (i = 0; i < 10; i++)
{
	SamplerPitchKnob[i] = Content.getComponent("SamplerPitch" + i);
	SamplerPitch[i] = Synth.getModulator("SamplerPitch" + (i+1));
	SamplerPitchKnob[i].setControlCallback(onSamplerPitchControl);
	
}

inline function onSamplerPitchControl(component, value)
{
	local idx = SamplerPitchKnob.indexOf(component);
	
	SamplerPitch[idx].setIntensity(value);
};

//Table
const var velocityTable = Content.getComponent("velocityTable");
const var VelocityModulator = Synth.getTableProcessor("Velocity Modulator");


inline function onresetTableButtonControl(component, value)
{
	VelocityModulator.reset(0);
};

Content.getComponent("resetTableButton").setControlCallback(onresetTableButtonControl);


inline function onlinearVelButtonControl(component, value)
{
	VelocityModulator.reset(0);
	VelocityModulator.setTablePoint(0, 1, 0, 1, 0.5);
};

Content.getComponent("linearVelButton").setControlCallback(onlinearVelButtonControl);

inline function onlinearVelButton1Control(component, value)
{
	VelocityModulator.reset(0);
	VelocityModulator.setTablePoint(0, 1, 0, 1, 1);
};

Content.getComponent("linearVelButton1").setControlCallback(onlinearVelButton1Control);

inline function onlinearVelButton2Control(component, value)
{
	VelocityModulator.reset(0);
	VelocityModulator.setTablePoint(0, 1, 0, 1, 0.1);
};

Content.getComponent("linearVelButton2").setControlCallback(onlinearVelButton2Control);

inline function onlinearVelButton3Control(component, value)
{
		VelocityModulator.reset(0);
	VelocityModulator.setTablePoint(0, 0, 55, 55, 0.5);
};

Content.getComponent("linearVelButton3").setControlCallback(onlinearVelButton3Control);

//MIXER CONTROLS---------------------------------------------------

const var Bleeding = [];
const var BleedingKnob = [];

for (i = 0; i < 10; i++)
{
	Bleeding[i] = Synth.getEffect("ZSend" + (i+1));
	BleedingKnob[i] = Content.getComponent("bleedKnob" + i);
	BleedingKnob[i].setControlCallback(onbleedKnobControl);
}


inline function onbleedKnobControl(component, value)
{
	local idx = BleedingKnob.indexOf(component);
	Bleeding[idx].setAttribute(Bleeding[idx].Gain, value);
};

//Room Sends

const var Room = [];
const var RoomKnob = [];

for (i = 0; i < 10; i++)
{
	Room[i] = Synth.getEffect("RoomSend" + (i+1));
	RoomKnob[i] = Content.getComponent("roomKnob" + i);
	RoomKnob[i].setControlCallback(onRoomKnobControl);
}


inline function onRoomKnobControl(component, value)
{
	local idx = RoomKnob.indexOf(component);
	Room[idx].setAttribute(Room[idx].Gain, value);
};

//Overhead Sends

const var Overhead = [];
const var OverheadKnob = [];

for (i = 0; i < 10; i++)
{
	Overhead[i] = Synth.getEffect("OhSend" + (i+1));
	OverheadKnob[i] = Content.getComponent("OhKnob" + i);
	OverheadKnob[i].setControlCallback(onOverheadKnobControl);
}


inline function onOverheadKnobControl(component, value)
{
	local idx = OverheadKnob.indexOf(component);
	Overhead[idx].setAttribute(Overhead[idx].Gain, value);
};

//Reverb Sends

const var ReverbSend = [];
const var ReverbSendKnob = [];

for (i = 0; i < 12; i++)
{
	ReverbSend[i] = Synth.getEffect("ReverbSend" + (i+1));
	ReverbSendKnob[i] = Content.getComponent("verbSendKnob" + i);
	ReverbSendKnob[i].setControlCallback(onReverbSendKnobControl);
}


inline function onReverbSendKnobControl(component, value)
{
	local idx = ReverbSendKnob.indexOf(component);
	ReverbSend[idx].setAttribute(ReverbSend[idx].Gain, value);
};

//ConvoSend

const var ConvoSend = [];
const var ConvoSendKnob = [];

for (i = 0; i < 12; i++)
{
	ConvoSend[i] = Synth.getEffect("ConvoSend" + (i+1));
	ConvoSendKnob[i] = Content.getComponent("ConvoSend" + i);
	ConvoSendKnob[i].setControlCallback(onConvoSendKnobControl);
}

inline function onConvoSendKnobControl(component, value)
{
	local idx = ConvoSendKnob.indexOf(component);
	ConvoSend[idx].setAttribute(ConvoSend[idx].Gain, value);
};

//Delay Sends


const var DelaySend = [];
const var DelaySendKnob = [];

for (i = 0; i < 12; i++)
{
	DelaySend[i] = Synth.getEffect("DelaySend" + (i+1));
	DelaySendKnob[i] = Content.getComponent("delaySendKnob" + i);
	DelaySendKnob[i].setControlCallback(onDelaySendKnobControl);
}

inline function onDelaySendKnobControl(component, value)
{
	local idx = DelaySendKnob.indexOf(component);
	DelaySend[idx].setAttribute(DelaySend[idx].Gain, value);
};


//Comp Sends

const var CompSend = [];
const var CompSendKnob = [];

for (i = 0; i < 12; i++)
{
	CompSend[i] = Synth.getEffect("CompSend" + (i+1));
	CompSendKnob[i] = Content.getComponent("CompSend" + i);
	CompSendKnob[i].setControlCallback(onCompSendKnobControl);
}

inline function onCompSendKnobControl(component, value)
{
	local idx = CompSendKnob.indexOf(component);
	CompSend[idx].setAttribute(CompSend[idx].Gain, value);
};

//Dynamix

const var Dynamics = [];
const var ThresholdKnob = [];
const var DynAttackKnob = [];
const var DynReleaseKnob = [];
const var DynBypass = [];
const var DynRatioKnob = [];
const var DynMakeUpKnob = [];

for (i = 0; i < 12; i++)
{
	Dynamics[i] = Synth.getEffect("Dynamics" + (i+1));
	ThresholdKnob[i] = Content.getComponent("thresholdKnob" + i);
	DynAttackKnob[i] = Content.getComponent("compAttackKnob" + i);
	DynReleaseKnob[i] = Content.getComponent("compReleaseKnob" + i);
	DynMakeUpKnob[i] = Content.getComponent("makeUpKnob" + i);
	DynRatioKnob[i] = Content.getComponent("compRatioKnob" + i);
	DynBypass[i] = Content.getComponent("compBypass" + i);
	ThresholdKnob[i].setControlCallback(onthresholdKnobControl);
	DynAttackKnob[i].setControlCallback(oncompAttackKnobControl);
	DynReleaseKnob[i].setControlCallback(oncompReleaseKnobControl);
	DynMakeUpKnob[i].setControlCallback(onmakeUpKnobControl);
	DynRatioKnob[i].setControlCallback(oncompRatioControl);
	DynBypass[i].setControlCallback(oncompBypass0Control);
}


inline function onthresholdKnobControl(component, value)
{
	local idx = ThresholdKnob.indexOf(component);
	Dynamics[idx].setAttribute(Dynamics[idx].Threshold, value);
	
};

inline function oncompAttackKnobControl(component, value)
{
	local idx = DynAttackKnob.indexOf(component);
	Dynamics[idx].setAttribute(Dynamics[idx].Attack, value);
	
};

inline function oncompReleaseKnobControl(component, value)
{
	local idx = DynReleaseKnob.indexOf(component);
	Dynamics[idx].setAttribute(Dynamics[idx].Release, value);
};

inline function onmakeUpKnobControl(component, value)
{
	local idx = DynMakeUpKnob.indexOf(component);
	Dynamics[idx].setAttribute(Dynamics[idx].MakeUp, value);
};

inline function oncompRatioControl(component, value)
{
	local idx = DynRatioKnob.indexOf(component);
	Dynamics[idx].setAttribute(Dynamics[idx].Ratio, value);
};

inline function oncompBypass0Control(component, value)
{
	local idx = DynBypass.indexOf(component);
	Dynamics[idx].setBypassed(1-value);
};


//EQ

const var ParametriqEQ = [];
const var EQBypassButton = [];

for (i = 0; i < 12; i++)
{
	ParametriqEQ[i] = Synth.getEffect("Parametriq EQ" + (i+1));
	EQBypassButton[i] = Content.getComponent("eqBypass" + i);
	EQBypassButton[i].setControlCallback(onEQBypassButtonControl);
}

inline function onEQBypassButtonControl(component, value)
{
	local idx = EQBypassButton.indexOf(component);
	ParametriqEQ[idx].setBypassed(1-value);
};

//Routing Matrix
const var NUM_ROUTES = 16;
const var routers = [];

for (i = 0; i < NUM_ROUTES; i++)
{
	routers[i] = Content.getComponent("ChSelect"+i);
	routers[i].setControlCallback(onRoutersControl);
}

inline function onRoutersControl(component, value)
{
	if (value)
	{ 
		local idx = routers.indexOf(component);
		
		for (i = 0; i < NUM_ROUTES; i++)
		{
			
				Matrix.addConnection((idx)*2,(value-1)*2);
				Matrix.addConnection(1+(idx)*2,1+(value-1)*2);
		}
	}
};


inline function onRoutingPresetControl(component, value)
{
	if (value == 1)
	{
		for (i = 0; i < NUM_ROUTES; i++)
		{
			Content.getComponent("ChSelect"+i).setValue(1);
			Matrix.addConnection((i)*2,0);
			Matrix.addConnection(1+(i)*2,1);
			
		}	
	}
	else if (value == 2)
	{
		for (i = 0; i < NUM_ROUTES; i++)
		{
			Content.getComponent("ChSelect"+i).setValue(i+1);
			Matrix.addConnection((i)*2,(i)*2);
			Matrix.addConnection(1+(i)*2,1+(i)*2);
		}	
		

	}
};

Content.getComponent("RoutingPreset").setControlCallback(onRoutingPresetControl);

//PITCH

inline function onPitchFactorControl(component, value)
{
	Engine.setGlobalPitchFactor(value);
};

Content.getComponent("PitchFactor").setControlCallback(onPitchFactorControl);

//Mapping
const var VdrumsMapping = Synth.getMidiProcessor("VdrumsMapping");
const var AddictiveMapping = Synth.getMidiProcessor("AddictiveMapping");
const var SuperiorMapping = Synth.getMidiProcessor("SuperiorMapping");

inline function onMappingPresetControl(component, value)
{
	if (value == 1)
	{
		VdrumsMapping.setBypassed(true);
		AddictiveMapping.setBypassed(true);
		SuperiorMapping.setBypassed(true);
	}
	else if (value == 2)
	{
		VdrumsMapping.setBypassed(false);
		AddictiveMapping.setBypassed(true);
		SuperiorMapping.setBypassed(true);
	}
	else if (value == 3)
	{
		VdrumsMapping.setBypassed(true);
		AddictiveMapping.setBypassed(false);
		SuperiorMapping.setBypassed(true);
	}
	else if (value == 4)
	{
		VdrumsMapping.setBypassed(true);
		AddictiveMapping.setBypassed(true);
		SuperiorMapping.setBypassed(false);
	}
};

Content.getComponent("MappingPreset").setControlCallback(onMappingPresetControl);

//Cymbal Choke

const var RideChoke = Synth.getMidiProcessor("RideChoke");
const var CymbalChoke0 = Synth.getMidiProcessor("Cymbal Choke0");
const var CymbalChoke1 = Synth.getMidiProcessor("Cymbal Choke1");
const var CymbalChoke2 = Synth.getMidiProcessor("Cymbal Choke2");

inline function oncymbalChokeButtonControl(component, value)
{
	RideChoke.setBypassed(1-value);
	CymbalChoke0.setBypassed(1-value);
	CymbalChoke1.setBypassed(1-value);
	CymbalChoke2.setBypassed(1-value);
};

Content.getComponent("cymbalChokeButton").setControlCallback(oncymbalChokeButtonControl);


//Saturation

const var OhSaturator = Synth.getEffect("OhSaturator");
const var OhSatGain = Synth.getEffect("OhSatGain");
const var RoomSaturator = Synth.getEffect("RoomSaturator");
const var RoomSatGain = Synth.getEffect("RoomSatGain");


inline function onohDistBypassControl(component, value)
{
	OhSaturator.setBypassed(1-value);
	OhSatGain.setBypassed(1-value);
};

Content.getComponent("ohDistBypass").setControlCallback(onohDistBypassControl);

inline function onroomDistBypassControl(component, value)
{
	RoomSaturator.setBypassed(1-value);
	RoomSatGain.setBypassed(1-value);
};

Content.getComponent("roomDistBypass").setControlCallback(onroomDistBypassControl);


//Parallel Gain Reduction

// Fetch a displaybuffer source reference to the DSP network
const var dp = Synth.getDisplayBufferSource("ParalellCompressor");

// Get the first "external" Displaybuffer
const var gr = dp.getDisplayBuffer(0);

// Set the buffer length to 1024 (about 23ms)
// (this correlates with the timer frequency below)
gr.setRingBufferProperties({
  "BufferLength": 1024,
  "NumChannels": 1
});

// Get a reference to the FIFO that contains the values
const var buffer = gr.getReadBuffer();


const var gainReductionKnob = Content.getComponent("gainReductionKnob");

gainReductionKnob.setLocalLookAndFeel(LAF.ReductionLaf);

const var reduction = Engine.createTimerObject();

reduction.setTimerCallback(function()
{
	// Fetch the maximum value of the last 50ms and display
	// it on the knob
	
	//gainReductionKnob.setValue(buffer.getMagnitude(0, buffer.length));
	gainReductionKnob.setValue(Engine.getDecibelsForGainFactor(1-buffer.getMagnitude(0, buffer.length)));
});

// Start the timer with ~30Hz.
reduction.startTimer(30);

