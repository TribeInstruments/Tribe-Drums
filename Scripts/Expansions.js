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

namespace Expansions
{
	
// Definitions

const var initButton = Content.getComponent("initButton");

const var clipPanel = Content.getComponent("clipPanel");
const var clipNameLabel = Content.getComponent("clipNameLabel");

//Expansion DEFINITIONS ---------------------------------------------------------------

const var expHandler = Engine.createExpansionHandler();
const var currentExpansion = expHandler.getCurrentExpansion();

reg currentTempo = "";
reg sampleMapList = [];

const var groovesViewport = Content.getComponent("groovesViewport");

const var MIDIPlayer1 = Synth.getMidiPlayer("MIDI Player1");
const var syncButton = Content.getComponent("syncButton");

const var SampleSelectorCombo = [];
const var MixerSelectorCombo = [];
const var SamplerImage = [];
const var MixerThumbnail = [];
const var MixerImage = [];

const var dropPanel = Content.getComponent("dropPanel");

//Groove Tables

groovesViewport.setTableMode({
	"RowHeight": 28
});

groovesViewport.setTableColumns([
{
	"ID": "groove_play",
	"Label": "",
	"Type": "Button",
	"Text": "play",
	"Toggle": false,
	"Width": 30
},
{
	"ID": "groove_stop",
	"Label": "",
	"Type": "Button",
	"Text": "stop",
	"Toggle": false,
	"Width": 30
},
{
	"ID": "groove_name",
	"Label": "Groove",
	"Type": "Text",
	"Width": 288
},
{
	"ID": "groove_category",
	"Label": "Category",
	"Type": "Text",
	"Width":120
},
{
	"ID": "groove_tempo",
	"Label": "BPM",
	"Type": "Text",
	"Width":100
},
{
	"ID": "groove_signature",
	"Label": "Time",
	"Type": "Text",
	"Width":100
}]);

inline function onTableCallback(obj)
{
	local index = obj.rowIndex;
	
	Console.print(trace(obj));
		
	if(obj.Type == "Click")
	{
		Console.print("Clicked on " + obj.rowIndex);
		
		MIDIPlayer1.setFile(grooves[index], true, false);
		MIDIPlayer1.setPlaybackPosition(0);
		
		currentTempo = groovesTempo[index];
		
		clipNameLabel.set("text", grooves[index]);
		clipPanel.showControl(true);
		
		if(syncButton.getValue() == 0)
		{
			Engine.setHostBpm(groovesTempo[index]);
		}
		else if (syncButton.getValue() == 1)
		{
			Engine.setHostBpm(-1);
		}	
	}
	if(obj.Type == "Button")
		{
			if(!obj.value)
			return;
			Console.print("Clicked on " + obj.rowIndex);
			
			if(obj.columnID == "groove_play")
			{
				MIDIPlayer1.setFile(grooves[index], true, false);
				MIDIPlayer1.setPlaybackPosition(0);
				
				currentTempo = groovesTempo[index];
				
				clipNameLabel.set("text", grooves[index]);
				clipPanel.showControl(true);
				
				if(syncButton.getValue() == 0)
				{
					Engine.setHostBpm(groovesTempo[index]);
				}
				else if (syncButton.getValue() == 1)
				{
					Engine.setHostBpm(-1);
				}
				
				MIDIPlayer1.play(0);
			}
			else if(obj.columnID == "groove_stop")
			{
				MIDIPlayer1.stop(0);
			}	
	
		}

};

groovesViewport.setTableCallback(onTableCallback);

//Set Initial Configuration without Expansion -------------------------

groovesViewport.set("fontSize", Theme.smallSize);

MIDIPlayer1.setFile("", true, false);

for (i = 0; i < 10; i++)
{
	SamplerImage[i] = Content.getComponent("SamplerImage" + i);
	SampleSelectorCombo[i] = Content.getComponent("SampleSelectorCombo" + (i+1));
	SampleSelectorCombo[i].setControlCallback(onsamplemapSelectComboControl);
	SampleSelectorCombo[i].setLocalLookAndFeel(ZoomComboLaf);
	
	MixerSelectorCombo[i] = Content.getComponent("MixerSelectorCombo" + i);
	MixerSelectorCombo[i].setLocalLookAndFeel(ZoomComboLaf);
	MixerImage[i] = Content.getComponent("MixerImage" + i);
			
	MixerThumbnail[i] = Content.getComponent("MixerThumbnail" + i);
	
}

reg Thumbnail = "";

//Set Sampler Images
		
inline function onsamplemapSelectComboControl(component, value)
{
	local idx = SampleSelectorCombo.indexOf(component);
	
	if (value > 0)
	{
		local sampleMap = component.getItemText();
						
		SamplerImage[idx].setImageFile(Thumbnail + "Sampler" + Engine.doubleToString(value, 0)  + ".png", true);
		MixerThumbnail[idx].setImageFile(Thumbnail + "Sampler" + Engine.doubleToString(value, 0)  + ".png", true);
		
		if (sampleMapList[value - 1] != "")
		{
			Sampler[idx].asSampler().loadSampleMap(sampleMapList[value - 1]);	
			Console.print(sampleMapList[value - 1]);
		
		}	
	}	

};


//Loaded Expansion Definitions-------------------------------

const var BrowserImage = Content.getComponent("BrowserImage");
const var BGimage = Content.getComponent("BGImage");
const var BGLogo = Content.getComponent("BGLogo");
const var mapImage = Content.getComponent("mapImage");
const var BackgroundImage = Content.getComponent("BackgroundImage");

const var BrowserPanel = Content.getComponent("BrowserPanel");
const var expansionInfo = Content.getComponent("expansionInfo");

BGimage.setImageFile("{PROJECT_FOLDER}BG.png", true);
BrowserImage.setImageFile("{PROJECT_FOLDER}BG2.png", true);
BGLogo.setImageFile("{PROJECT_FOLDER}BGlogo.png", true);
mapImage.setImageFile("{PROJECT_FOLDER}Map.png", true);

//Expansion Callback-------------------------

expHandler.setExpansionCallback(function(e)
{
	if (!e)
	{
		//Clean Drop Zone
		clipPanel.showControl(false);
		clipNameLabel.set("text", "");
		
		//Set Sampler Empty Samplemaps
		for (i = 0; i < 10; i++)
		{
				SampleSelectorCombo[i].set("items", Sampler[i].asSampler().getSampleMapList().join("\n"));
				MixerSelectorCombo[i].set("items", Sampler[i].asSampler().getSampleMapList().join("\n"));
				SampleSelectorCombo[i].showControl(false);
				MixerSelectorCombo[i].showControl(false);
				SamplerImage[i].showControl(false);
				MixerThumbnail[i].showControl(false);
				MixerImage[i].showControl(true);
				AsSampler[i].clearSampleMap();
		}
		
		//Load Default Images and adjust GUI
		BrowserImage.setImageFile("{PROJECT_FOLDER}BG2.png", true);
		BGimage.setImageFile("{PROJECT_FOLDER}BG.png", true);
		BGLogo.setImageFile("{PROJECT_FOLDER}BGlogo.png", true);
		mapImage.setImageFile("{PROJECT_FOLDER}Map.png", true);
		BackgroundImage.setImageFile("{PROJECT_FOLDER}BG3.png", true);
		
		initButton.showControl(true);
		BrowserPanel.setPosition(10, 0, 730, 330);
		Thumbnail = "{PROJECT_FOLDER}";
		expansionInfo.set("text", "");

		MIDIPlayer1.setFile("", true, false);
	}

	else
	{
		//Set Sampler Samplemaps and Images		
		for (i = 0; i < 10; i++)
		{
			SampleSelectorCombo[i].set("items", e.getSampleMapList().join("\n").replace(e.getWildcardReference("")));
			MixerSelectorCombo[i].set("items", e.getSampleMapList().join("\n").replace(e.getWildcardReference("")));
			SampleSelectorCombo[i].showControl(true);
			SamplerImage[i].showControl(true);
			MixerSelectorCombo[i].showControl(true);
			MixerThumbnail[i].showControl(true);
			MixerImage[i].showControl(false);
		}
		
		sampleMapList = e.getSampleMapList();
		
		//Loaded Expansion Definitions
		
		var folder = e.getWildcardReference("BG.png");
		var folder2 = e.getWildcardReference("BG2.png");
		var folder3 = e.getWildcardReference("BGlogo.png");
		var folder4 = e.getWildcardReference("Map.png");
		var folder5 = e.getWildcardReference("BG3.png");

		reg MIDIList = e.getMidiFileList();
		
		var expansionData = e.loadDataFile("expansionInfo.json");
		reg eData = expansionData.expansionInfo;

		//Load Images and Show/Hide/Load Elements
		
		BGimage.setImageFile(folder, true);
		BrowserImage.setImageFile(folder2, true);
		BGLogo.setImageFile(folder3, true);
		mapImage.setImageFile(folder4, true);
		BackgroundImage.setImageFile(folder5, true);
		
		BrowserImage.showControl(true);
				
		BGimage.showControl(true);
		BGLogo.showControl(true);
		initButton.showControl(false);
		BrowserPanel.setPosition(10, 0, 730, 370);
		Thumbnail = e.getWildcardReference("");
		expansionInfo.set("text", eData);
		
		//MIDI Player Table Data
		
		var midiTempoData = e.loadDataFile("Tempo.json");
		reg midiTempo = midiTempoData.tempo;

		reg groovesData = e.loadDataFile("Grooves.json");
		reg grooves = groovesData.grooves;
		reg groovesTempo = groovesData.tempo;
		reg groovesCat = groovesData.category;
		reg groovesTime = groovesData.signature;
		
		reg groovesRow = [];
		
		for (i = 0; i < grooves.length; i ++)
		{
			groovesRow[i] =
			{
				"groove_play": false,
				"groove_stop": false,
				"groove_name": grooves[i].replace(e.getWildcardReference("")).replace("Grooves/", "").replace(".mid", ""),
				"groove_category": groovesCat[i], 
				"groove_tempo": groovesTempo[i],
				"groove_signature": groovesTime[i]
			};
		}
				
		groovesViewport.setTableRowData(groovesRow);
		
		//Sync Button Callback
		inline function onsyncButtonControl(component, value)
		{
			if(value == 1)
			{
				Engine.setHostBpm(-1);
			}
			else if (value == 0)
			{
				Engine.setHostBpm(currentTempo);
			}
			
		};
		
		Content.getComponent("syncButton").setControlCallback(onsyncButtonControl);		
		
		//Set Keyboard Colors
		
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
		
								
		}		
			
});

//Refresh Expansions Callback
inline function onrefreshButtonControl(component, value)
{
	expHandler.refreshExpansions();
};

Content.getComponent("refreshButton").setControlCallback(onrefreshButtonControl);


//Preset Manager---------------------------------------------------------------
const var presetLabel = Content.getComponent("presetLabel");

presetLabel.set("fontSize", Theme.controlSize);

inline function onpreviousPresetButtonControl(component, value)
{
	Engine.loadPreviousUserPreset(true);
};

Content.getComponent("previousPresetButton").setControlCallback(onpreviousPresetButtonControl);

inline function onnextPresetButtonControl(component, value)
{
	Engine.loadNextUserPreset(true);
};

Content.getComponent("nextPresetButton").setControlCallback(onnextPresetButtonControl);


inline function onpresetCallbackControl(component, value)
{

	if (Engine.getCurrentUserPresetName() == "")
	{
	presetLabel.set("text", "Load a Preset");
	}
	else
	{ 
	presetLabel.set("text", Engine.getCurrentUserPresetName());
	}
};

Content.getComponent("presetCallback").setControlCallback(onpresetCallbackControl);

}