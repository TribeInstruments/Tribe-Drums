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

Content.makeFrontInterface(960, 540);

Synth.deferCallbacks(true);

Engine.loadAudioFilesIntoPool();

for (i = 0; i < 12; i++)
{
	Engine.addModuleStateToUserPreset("Parametriq EQ" + (i+1));
}

//Includes-------------------------------------------------------------------

include ("Theme.js");
include ("Paths.js");
include ("LAF.js");
include ("GUI.js");
include ("Controls.js");
include ("Expansions.js");
include ("Meters.js");
include ("ZoomHandler.js");
include ("Paint.js");

//Definitions----------------------------------------------------------------

const var syncButton1 = Content.getComponent("syncButton1");
syncButton1.setValue(0);

//Sampler
const var TRIBEDrums = Synth.getChildSynth("TRIBE Drums");
const var Matrix = Synth.getRoutingMatrix("TRIBE Drums");
const var NUM_SAMPLERS = 10;
const var Sampler = [];
const var AsSampler = [];

for (i = 0; i < NUM_SAMPLERS; i++)
{
	AsSampler[i] = Synth.getSampler("Sampler" + (i+1));
	Sampler[i] = Synth.getChildSynth("Sampler" + (i+1));
	AsSampler[i].setUseStaticMatrix(true);
}

//Main Functions

const var configPanel0 = Content.getComponent("configPanel0");
const var configButton0 = Content.getComponent("configButton0");
const var midiDevicesPanel = Content.getComponent("midiDevicesPanel");

if (Engine.isPlugin() == 1)
{
	configPanel0.showControl(false);
	configButton0.showControl(false);
	midiDevicesPanel.showControl(false);
}
else
{
	configPanel0.showControl(true);
	configButton0.showControl(true);
	midiDevicesPanel.showControl(true);

}

//Keyboard-----------------------------------------------------------------

const var KeyboardFunctionPanel = Content.getComponent("KeyboardFunctionPanel");

KeyboardFunctionPanel.setLoadingCallback(function(isPreloading)
{
	if(!isPreloading)
	for (i = 0; i < 127; i++)
	{

	Engine.setKeyColour(i, Colours.withAlpha(Colours.antiquewhite, 0.15));
	Engine.setKeyColour(24, Colours.withAlpha(Colours.red, 0.3));
	                   	    
	if (Sampler[0].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF9A6CD4, 0.5));
	
	if (Sampler[1].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF54A2BC, 0.3));
	
	if (Sampler[2].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF5ABC83, 0.3));
	
	if (Sampler[3].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFBCB458, 0.5));
	
	if (Sampler[4].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFBF5858, 0.3));
	
	if (Sampler[5].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFB9579B, 0.3));
	
	if (Sampler[6].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF6258C3, 0.5));
	
	if (Sampler[7].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF729147, 0.3));
	
	if (Sampler[8].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFBC7848, 0.3));
	
	if (Sampler[9].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF683434, 0.3));
	
	}  
});

reg i;

for (i = 0; i < 127; i++)
{
	Engine.setKeyColour(i, Colours.withAlpha(Colours.antiquewhite, 0.15));
	Engine.setKeyColour(24, Colours.withAlpha(Colours.red, 0.3));
	                   	    
	if (Sampler[0].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF9A6CD4, 0.5));
	
	if (Sampler[1].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF54A2BC, 0.3));
	
	if (Sampler[2].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF5ABC83, 0.3));
	
	if (Sampler[3].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFBCB458, 0.5));
	
	if (Sampler[4].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFBF5858, 0.3));
	
	if (Sampler[5].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFB9579B, 0.3));
	
	if (Sampler[6].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF6258C3, 0.5));
	
	if (Sampler[7].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF729147, 0.3));
	
	if (Sampler[8].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFFBC7848, 0.3));
	
	if (Sampler[9].asSampler().isNoteNumberMapped(i))
	Engine.setKeyColour(i, Colours.withAlpha(0xFF683434, 0.3));
}

//GUI

//Loading-------------------------------------------------------------------

const var loadingPanel = Content.getComponent("loadingPanel");
const var loadingPanel1 = Content.getComponent("loadingPanel1");
const var percentagePanel = Content.getComponent("percentagePanel");

loadingPanel.showControl(false);

loadingPanel.setLoadingCallback(function(isLoading)
{
	if(isLoading)
	{
		loadingPanel.setValue(0);
		loadingPanel.startTimer(100);
		percentagePanel.startTimer(100);
		loadingPanel.showControl(true);
		loadingPanel1.showControl(true);
		percentagePanel.showControl(true);
	}

	if(!isLoading)
	{
		loadingPanel.stopTimer();
		loadingPanel.showControl(false);
		loadingPanel1.showControl(false);
		
		percentagePanel.stopTimer();
		percentagePanel.showControl(false);
		
	}

});


reg angle = 360;
reg speed = 30;

loadingPanel.setTimerCallback(function()
{
	var x = this.getValue();
	x = x + 0.1;
	this.setValue(x);	
	angle = (angle + speed) % 360;
	this.repaint();
});

loadingPanel.setPaintRoutine(function(g)
{
	var a = [5, 5, this.getWidth() - 10, this.getHeight() - 10];
		
	var v = this.getValue();
	
	g.rotate(Math.toRadians(angle), [this.get("width")/2, this.get("height")/2]);
	g.drawDropShadowFromPath(Paths.icons.logoicon, a, 0x88000000, 5, [0, 0]);
	g.setColour(Colours.whitesmoke);
	g.setOpacity(0.8);
	g.fillPath(Paths.icons.logoicon, a);
	
}); 

//Percentage Show

percentagePanel.setPaintRoutine(function(g)
{
	g.setColour(Colours.whitesmoke);
	g.setFont(Theme.mediumFont, Theme.fontSize);
	g.drawAlignedText(Math.round(this.data.progress * 100) + " %", this.getLocalBounds(2), "topLeft");
	g.drawAlignedText(this.data.message, this.getLocalBounds(2), "bottomLeft");
	
});

percentagePanel.setTimerCallback(function()
{
	this.data.progress = Engine.getPreloadProgress();
	this.data.message = Engine.getPreloadMessage();
	this.repaint();
});

//Show Version
const var versionLabel = Content.getComponent("versionLabel");
versionLabel.set("text", "VERSION  " + Engine.getVersion());
function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	/*if (Message.getControllerNumber() == 1)
	{
		WheelVelSlider.setValue(Message.getControllerValue());
		wheelSlider.setValue(Message.getControllerValue());
	}*/
	
}
 
function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 