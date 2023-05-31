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

namespace Paint
{
//**** set Look And Feel to change appearence

//Definitions

const var cornerData = 5;

//Close and Hide Buttons

const var closeButtons = Content.getAllComponents("close");

for (i = 0; i < closeButtons.length; i++)
	closeButtons[i].setLocalLookAndFeel(LAF.customLaf);

Content.getComponent("hideQuestionButton").setLocalLookAndFeel(LAF.customLaf);

//Viewport

Content.getComponent("groovesViewport").setLocalLookAndFeel(LAF.viewportLaf);

//******* HEADER Painting *********

//Zoom Viewer
Content.getComponent("ZoomCombo").setLocalLookAndFeel(LAF.ZoomComboLaf);
Content.getComponent("BypassButton").setLocalLookAndFeel(LAF.customLaf);

//Navigation Buttons
const var NUM_NAVIGATION = 5;

for (i = 0; i < NUM_NAVIGATION; i++)
	Content.getComponent("GUIButton" + i).setLocalLookAndFeel(LAF.headerButton);

//Preset Buttons
const var presetButtons = [Content.getComponent("showPresetButton"),
                           Content.getComponent("nextPresetButton"),
                           Content.getComponent("previousPresetButton")];

for (i = 0; i < presetButtons.length; i++)
	presetButtons[i].setLocalLookAndFeel(LAF.customLaf);

//Config Button
Content.getComponent("ConfigButton").setLocalLookAndFeel(LAF.headerButton);

//Panic Button
Content.getComponent("PanicButton").setLocalLookAndFeel(LAF.headerButton);

//Master Volume Fader
Content.getComponent("MasterFader").setLocalLookAndFeel(LAF.customLaf);

//Master Pan Knob
Content.getComponent("MasterPanSlider").setLocalLookAndFeel(LAF.customLaf);



//***** MAIN NAVIGATION GUI PANELS PAINTING

//Init Show Presets Button

Content.getComponent("initButton").setLocalLookAndFeel(LAF.customLaf);

//Preset Window Buttons
const var presetBrowserButtons = [Content.getComponent("findButton"),
                           Content.getComponent("showInstallerButton"),
                           Content.getComponent("refreshButton")];

for (i = 0; i < presetBrowserButtons.length; i++)
	presetBrowserButtons[i].setLocalLookAndFeel(LAF.customLaf);


//Samplers

//Sampler Pitch Knobs

const var NUM_SAMPLERS = 10;

for (i = 0; i < NUM_SAMPLERS; i++)
	Content.getComponent("SamplerPitch" + i).setLocalLookAndFeel(LAF.customLaf);

//Envolpe Knobs

for (i = 0; i < NUM_SAMPLERS; i++)
{
	Content.getComponent("attackKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("holdKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("decayKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("sustainKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("releaseKnob" + i).setLocalLookAndFeel(LAF.customLaf);
}

//Volume Faders

for (i = 0; i < NUM_SAMPLERS; i++)
	Content.getComponent("SamplerVolume" + (i+1)).setLocalLookAndFeel(LAF.customLaf);
	
//One Shot Buttons

for (i = 0; i < NUM_SAMPLERS; i++)
	Content.getComponent("samplerOneShot" + (i+1)).setLocalLookAndFeel(LAF.customLaf);

//Selectors

                   
for (i = 0; i < NUM_SAMPLERS; i++)
	Content.getComponent("SampleSelectorCombo" + (i+1)).setLocalLookAndFeel(LAF.ZoomComboLaf);

for (i = 0; i < NUM_SAMPLERS; i++)
	Content.getComponent("MixerSelectorCombo" + i).setLocalLookAndFeel(LAF.ZoomComboLaf);

//********* MIXER WINDOW PAINTING ***********

const var NUM_CHANNELS = 12;

//Mixer Components

for (i = 0; i < NUM_CHANNELS; i++)
{
	Content.getComponent("ChSelectButton" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("Fader" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("Pan" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("Solo" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("Mute" + i).setLocalLookAndFeel(LAF.customLaf);
}

//Mixer SamplerPitch

for (i = 9; i < 20; i++)
	Content.getComponent("SamplerPitch" + i).setLocalLookAndFeel(LAF.customLaf);

// Mixer Sampler Volume

for (i = 0; i < NUM_SAMPLERS; i++)
	Content.getComponent("MixerVolume" + i).setLocalLookAndFeel(LAF.customLaf);

// Mixer One Shot Buttons

for (i = 10; i < 21; i++)
	Content.getComponent("samplerOneShot" + i).setLocalLookAndFeel(LAF.customLaf);

// Mixer Envelope Knobs


for (i = 9; i < 20; i++)
{
	Content.getComponent("attackKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("holdKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("decayKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("sustainKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("releaseKnob" + i).setLocalLookAndFeel(LAF.customLaf);	
}

//Sends Faders

for (i = 0; i < NUM_SAMPLERS; i++)
{
	Content.getComponent("bleedKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("OhKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("roomKnob" + i).setLocalLookAndFeel(LAF.customLaf);
}

//Per Channel Components

for (i = 0; i < NUM_CHANNELS; i++)
{
	//FX Sends

	Content.getComponent("verbSendKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("delaySendKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("ConvoSend" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("CompSend" + i).setLocalLookAndFeel(LAF.customLaf);
	
	//Compressor
	Content.getComponent("thresholdKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("compAttackKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("compReleaseKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("compRatioKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("makeUpKnob" + i).setLocalLookAndFeel(LAF.customLaf);
	Content.getComponent("compBypass" + i).setLocalLookAndFeel(LAF.customLaf);
	
	//Eq
	Content.getComponent("eqBypass" + i).setLocalLookAndFeel(LAF.customLaf);
}

//Distortion Components
const var saturationKnobs = [Content.getComponent("ohDistortionDrive"),
                        Content.getComponent("ohDistortionMix"),
                        Content.getComponent("ohDistortionCut"),
                        Content.getComponent("ohDistortionGain"),
                        Content.getComponent("roomDistortionDrive"),
                        Content.getComponent("roomDistortionMix"),
                        Content.getComponent("roomDistortionCut"),
                        Content.getComponent("roomDistortionGain")];


for (i = 0; i < saturationKnobs.length; i++)
	saturationKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
//Distortion Bypass Buttons
Content.getComponent("ohDistBypass").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("roomDistBypass").setLocalLookAndFeel(LAF.customLaf);

//******** SIDEBAR PAINTING ********

//Siderbar Buttons
const var NUM_SIDEBARS = 5;

const var sidebarButtons = Content.getAllComponents("sideBarButton");

for (i = 0; i < NUM_SIDEBARS; i++)
	sidebarButtons[i].setLocalLookAndFeel(LAF.customLaf);
	
//Effects Tab

//Reverb
const var reverbKnobs = [Content.getComponent("AlgoSize"),
                         Content.getComponent("Fader13"),
                         Content.getComponent("AlgoDamp"),
                         Content.getComponent("AlgoWidth")];

for (i = 0; i < reverbKnobs.length; i++)
	reverbKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
Content.getComponent("AlgoBypass").setLocalLookAndFeel(LAF.customLaf);

//Convolution
const var convoKnobs = [Content.getComponent("ReverbPredelay"),
                        Content.getComponent("DelayFilter1"),
                        Content.getComponent("Fader14")];

for (i = 0; i < convoKnobs.length; i++)
	convoKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
Content.getComponent("ReverbBypass").setLocalLookAndFeel(LAF.customLaf);

//Delay

const var delayKnobs = [Content.getComponent("DelayFeedback"),
                        Content.getComponent("DelayTimeLeft"),
                        Content.getComponent("DelayTimeRight"),
                        Content.getComponent("Fader15"),
                        Content.getComponent("DelayFilter")];

for (i = 0; i < delayKnobs.length; i++)
	delayKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
Content.getComponent("DelayBypass").setLocalLookAndFeel(LAF.customLaf);

//Parallel Compresor

const var paraCompKnobs = [Content.getComponent("ParallelAttack"),
                           Content.getComponent("ParallelAttack1"),
                           Content.getComponent("ParallelRatio"),
                           Content.getComponent("parallelGain"),
                           Content.getComponent("ParallelThreshold")];

for (i = 0; i < paraCompKnobs.length; i++)
	paraCompKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
Content.getComponent("ParallelBypass").setLocalLookAndFeel(LAF.customLaf);

//Parallel Distortion

const var paraDistKnobs = [Content.getComponent("saturatorDrive"),
                      Content.getComponent("saturatorMix"),
                      Content.getComponent("saturatorLowCut"),
                      Content.getComponent("saturatorHicut"),
                      Content.getComponent("Fader12")];

for (i = 0; i < paraDistKnobs.length; i++)
	paraDistKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
Content.getComponent("SaturatorBypass").setLocalLookAndFeel(LAF.customLaf);

//VELOCITY MODULATOR

const var velocityButtons = [Content.getComponent("resetTableButton"),
                             Content.getComponent("linearVelButton"),
                             Content.getComponent("linearVelButton1"),
                             Content.getComponent("linearVelButton2"),
                             Content.getComponent("linearVelButton3")];

for (i = 0; i < velocityButtons.length; i++)
	velocityButtons[i].setLocalLookAndFeel(LAF.customLaf);

//PLAYING OPTIONS

const var playingButtons = [Content.getComponent("hatChokeButton"),
                            Content.getComponent("cymbalChokeButton")];

for (i = 0; i < playingButtons.length; i++)
	playingButtons[i].setLocalLookAndFeel(LAF.customLaf);
	
const var playingKnobs = [Content.getComponent("PitchFactor"),
                          Content.getComponent("MinVelocity"),
                          Content.getComponent("Max Velocity")];

for (i = 0; i < playingKnobs.length; i++)
	playingKnobs[i].setLocalLookAndFeel(LAF.customLaf);
	
//PLAYER BUTTONS

Content.getComponent("PlayButton").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("stopButton").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("syncButton").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("syncButton1").setLocalLookAndFeel(LAF.customLaf);


// ******* FOOTER PAINTING ***********

Content.getComponent("footerLogo").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("InfoButton").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("hideMetersButton").setLocalLookAndFeel(LAF.customLaf);


	
//****** ABOUT SECTION PAINTING ******
Content.getComponent("logoPlayerButton").setLocalLookAndFeel(LAF.customLaf);

//***** Configuration Panel Painting *******

//Config Tab Buttons
for (i = 0; i < 5; i++)
Content.getComponent("configButton" + i).setLocalLookAndFeel(LAF.customLaf);

//Midi Config Tiles
Content.getComponent("ScriptFloatingTile10").setLocalLookAndFeel(LAF.customLaf);
Content.getComponent("ScriptFloatingTile11").setLocalLookAndFeel(LAF.customLaf);

//Manual Button
Content.getComponent("ScriptButton2").setLocalLookAndFeel(LAF.customLaf);

//Logo Button
Content.getComponent("ScriptButton3").setLocalLookAndFeel(LAF.customLaf);

//****** PAINT ROUTINES **********

const mainColour = 0XFF454F5F;
const darkColour = 0xFF252A35;
const brightColour = 0xFFD1CDD2;

//Shades
const var drawPanel = Content.getComponent("drawPanel");

drawPanel.setPaintRoutine(function(g)
{
	g.drawDropShadow([-10, -10, 795, 15], Colours.withAlpha(Colours.black, 0.7), 10);
	g.drawDropShadow([-10, 365, 795, 15], Colours.withAlpha(Colours.black, 0.7), 10);
	g.drawDropShadow([745, -10, 10, 380], Colours.withAlpha(Colours.black, 0.7), 10);	
	
});

const var drawPanel1 = Content.getComponent("drawPanel1");

drawPanel1.setPaintRoutine(function(g)
{	
	var a = this.getLocalBounds(0);
	
	g.drawDropShadow([-10, -10, 795, 15], Colours.withAlpha(Colours.black, 0.7), 10);
	g.drawDropShadow([-10, 365, 795, 15], Colours.withAlpha(Colours.black, 0.7), 10);
	g.drawDropShadow([745, -10, 10, 380], Colours.withAlpha(Colours.black, 0.7), 10);	
	
});

//Grid Panel

const var gridPanel = Content.getComponent("gridPanel");

gridPanel.setPaintRoutine(function(g)
{
	var a = this.getLocalBounds(0);
	
	var gradient = [Theme.LightColor, 0, this.getHeight() / 2, Theme.MidColor, 0, this.getHeight() / 1];
	var gradient2 = [Colours.withAlpha(Theme.BrightColor, 0.1), 0, 0, Colours.withAlpha(Theme.LightColor, 0.5), 0, this.getHeight() / 1.1];
	
	g.setGradientFill(gradient);
	
	for (i = 0; i < 8; i++)
	{	

		g.fillRoundedRectangle([this.getWidth() / 8 * i + 2, a[1] + 2, 5, 5], 2,);
		
	}
	
	g.setGradientFill(gradient);
	g.setOpacity(0.8);
	

	
	for (i = 0; i < 8; i++)
	{	
		g.drawLine(this.getWidth() / 8 * i, this.getWidth() / 8 * i, 0, 10, 1);
		
	}

	g.setGradientFill(gradient2);
	g.setOpacity(0.5);
	
	g.drawHorizontalLine(10, 0, this.getWidth() - 10);
	
	for (i = 0; i < 16; i++)
	{	
		g.drawLine(this.getWidth() / 16 * i, this.getWidth() / 16 * i, 0, 10, 1);
		
	}
	
	g.setOpacity(0.3);
	for (i = 0; i < 64; i++)
	{	
		g.drawLine(this.getWidth() / 64 * i, this.getWidth() / 64 * i, 10, this.getHeight(), 0.5);
		
	}

});

//Groove Player Panel
const var grooveListPanel = Content.getComponent("grooveListPanel");

grooveListPanel.setPaintRoutine(function(g)
{
	var a = this.getLocalBounds(0);
	
	var gradient = [Theme.MidColor, 0, this.getHeight() / 2, Theme.MidColor, 0, this.getHeight() / 1];
	var gradient2 = [Colours.withAlpha(Theme.BrightColor, 0.1), 0, 0, Colours.withAlpha(Theme.LightColor, 0.5), 0, this.getHeight() / 1.1];
	
	g.setGradientFill(gradient);
	g.fillRoundedRectangle(a, 4);
	
	//g.setGradientFill(gradient2);
	//g.drawRoundedRectangle(a, 4, 1.5);

});

/*

//Sampler Tabs

const var volumePanels = Content.getAllComponents("ChPanel");

for (i = 0; i < 5; i ++)
{
	volumePanels[i].set("itemColour", 0xFF424341);
	volumePanels[i].set("itemColour2", 0xFF5B5C5A);
	volumePanels[i].set("borderRadius", 2);
	
}

for (i = 5; i < 10; i ++)
{
	volumePanels[i].set("itemColour2", 0xFF5B5C5A);
	volumePanels[i].set("itemColour", 0xFF424341);
	volumePanels[i].set("borderRadius", 2);
	
}

//Mixer Panels

const var mixerPanel = Content.getComponent("mixerPanel");
mixerPanel.set("itemColour2", Theme.MidColor);
mixerPanel.set("itemColour", Theme.LightColor);

const var namePanels = Content.getAllComponents("NamePanel");

for (i = 0; i < 10; i ++)
{
	namePanels[i].set("itemColour", 0xFF626262);
	namePanels[i].set("itemColour2", 0xFF424242);
	namePanels[i].set("height", 175);
	
}

const var sendPanels = Content.getAllComponents("SendPanel");

for (i = 0; i < 12; i ++)
{
	sendPanels[i].set("itemColour", 0xFF424341);
	sendPanels[i].set("itemColour2", 0xFF5B5C5A);
	sendPanels[i].set("height", 175);
	
}

const var compPanels = Content.getAllComponents("compPanel");

for (i = 0; i < 12; i ++)
{
	compPanels[i].set("itemColour", 0xFF424341);
	compPanels[i].set("itemColour2", 0xFF5B5C5A);
	compPanels[i].set("height", 175);
	
}

const var eqPanels = Content.getAllComponents("eqPanel");

for (i = 0; i < 12; i ++)
{
	eqPanels[i].set("itemColour", 0xFF424341);
	eqPanels[i].set("itemColour2", 0xFF5B5C5A);
	eqPanels[i].set("height", 175);
	
}

const var distPanels = Content.getAllComponents("distPanel");

for (i = 0; i < 2; i ++)
{
	distPanels[i].set("itemColour", 0xFF424341);
	distPanels[i].set("itemColour2", 0xFF5B5C5A);
	distPanels[i].set("height", 175);
	
}

*/

}