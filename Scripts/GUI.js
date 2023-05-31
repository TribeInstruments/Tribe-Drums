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

//GUI

Synth.deferCallbacks(true);

//Definitions
const var footerLogo = Content.getComponent("footerLogo");
const var ZoomCombo = Content.getComponent("ZoomCombo");
const var BypassButton = Content.getComponent("BypassButton");

//Label Size Management

const var performanceTile = Content.getComponent("performanceTile");
performanceTile.set("FontSize", Theme.controlSize);

const var presetBrowserTile = Content.getComponent("presetBrowserTile");
presetBrowserTile.set("FontSize", Theme.fontSize);

//Set Font Size of Macro Controls

const var macroLabels = Content.getAllComponents("macroLabel");

for (i = 0; i < 3; i++)
{
	macroLabels[i].set("fontSize", Theme.controlSize);
	macroLabels[i].set("fontName", Theme.mainFont);
}

	
//Set Font Size of Sampler Options Controls

const var samplerLabels = Content.getAllComponents("samplerControlLabel");

for (i = 0; i < 60; i++)
{
	samplerLabels[i].set("fontSize", Theme.smallSize - 1);
	samplerLabels[i].set("fontName", Theme.mainFont);
}

	
//Set Font Size of Channel Mixer Controls

const var mixerLabels = Content.getAllComponents("mixerLabel");

for (i = 0; i < 256; i++)
{
	mixerLabels[i].set("fontSize", Theme.smallSize - 1);
	mixerLabels[i].set("fontName", Theme.mainFont);
}

	
//Set Font Size of Sidebar Controls

const var sidebarLabels = Content.getAllComponents("sidebarLabel");

for (i = 0; i < 35; i++)
{
	sidebarLabels[i].set("fontSize", Theme.controlSize);
	//sidebarLabels[i].set("fontName", Theme.mainFont);
}

//Zoom---------------------------------------------------------------

//ZoomLevels

const var zoomLevels = [0.5, 0.75, 1.0, 1.2, 1.5, 1.75, 2.0];

inline function onZoomComboControl(component, value)
{
	Settings.setZoomLevel(zoomLevels[value - 1]);
};

Content.getComponent("ZoomCombo").setControlCallback(onZoomComboControl);

//ApplyLaf


//footerLogo.setLocalLookAndFeel(ButtonLaf);
//BypassButton.setLocalLookAndFeel(ButtonLaf);
ZoomCombo.setLocalLookAndFeel(LAF.ZoomComboLaf);

//GUI Tabs-------------------------------------------------------------------------

//CHANGE TABS
//Grab References

const var NUM_TABS = 5;
const var panels = [];
const var buttons = [];

for (i = 0; i < NUM_TABS; i++)
{
    panels[i] = Content.getComponent("GUIPanel"+(i));
    buttons[i] = Content.getComponent("GUIButton"+(i));
    buttons[i].setControlCallback(changeTab);
}

//Tab Button Callback function
inline function changeTab(component, value)
{	
	if (value)
	{
	
	local idx = buttons.indexOf(component);

	for (i = 0; i < panels.length; i++)
		{
			panels[i].showControl(false);
		}
		
 	panels[idx].showControl(true);
        
    }
}

//Sidebar
const var NUM_SIDEBARS = 5;
const var sidebars = [];
const var sidebarButtons = [];

for (i = 0; i < NUM_SIDEBARS; i++)
{
    sidebars[i] = Content.getComponent("sideBarPanel"+(i));
    sidebarButtons[i] = Content.getComponent("sideBarButton"+(i));
    sidebarButtons[i].setControlCallback(changeSideBar);
}

//Tab Button Callback function
inline function changeSideBar(component, value)
{	
	if (value)
	{
	
	local idx = sidebarButtons.indexOf(component);

	for (i = 0; i < sidebars.length; i++)
		{
			sidebars[i].showControl(false);
		}
		
 	sidebars[idx].showControl(true);
        
    }
}
//MixerPanel

const var NUM_MIXERS = 12;
const var ChannelPanel = [];
const var ChannelButton = [];

for (i = 0; i < NUM_MIXERS; i++)
{
    ChannelPanel[i] = Content.getComponent("ChannelPanel"+(i));
    ChannelButton[i] = Content.getComponent("ChSelectButton"+(i));
    ChannelButton[i].setControlCallback(changeMixerTab);
}

inline function changeMixerTab(component, value)
{	
	if (value)
	{
	
	local idx = ChannelButton.indexOf(component);

	for (i = 0; i < ChannelPanel.length; i++)
		{
			ChannelPanel[i].showControl(false);
		}
		
 	ChannelPanel[idx].showControl(true);
        
    }
}

//InfoTab
const var QuestionPanel = Content.getComponent("QuestionPanel");

inline function onInfoButtonControl(component, value)
{
	QuestionPanel.showControl(value);
};

Content.getComponent("InfoButton").setControlCallback(onInfoButtonControl);

//Config Tabs

const var configPanels = [];
const var configButtons = [];

for (i = 0; i < NUM_TABS; i++)
{
    configPanels[i] = Content.getComponent("configPanel"+(i));
    configButtons[i] = Content.getComponent("configButton"+(i));
    configButtons[i].setControlCallback(changeConfigTab);
}

//Tab Button Callback function
inline function changeConfigTab(component, value)
{	
	if (value)
	{
	
	local idx = configButtons.indexOf(component);

	for (i = 0; i < configPanels.length; i++)
		{
			configPanels[i].showControl(false);
		}
		
 	configPanels[idx].showControl(true);
        
    }
}

const var ConfigPanel = Content.getComponent("ConfigPanel");

inline function onConfigButtonControl(component, value)
{
	ConfigPanel.showControl(value);
};

Content.getComponent("ConfigButton").setControlCallback(onConfigButtonControl);

//Add Loibrary

inline function onshowInstallerButtonControl(component, value)
{
	if(!value)
	return;

	Engine.showMessageBox("Add New Library", "Please use TRIBE MANAGER App to add new libraries", 1);
	
};

Content.getComponent("showInstallerButton").setControlCallback(onshowInstallerButtonControl);




//Tooltip--------------------------------------------------------------------------

namespace ToolTip
{
	const var toolTipPanel = Content.getComponent("toolTipPanel");
	
	toolTipPanel.setPaintRoutine(function(g)
	{
		var t = Content.getCurrentTooltip();
		
		g.setColour(this.get("textColour"));
		g.setFont(Theme.regularFont, Theme.fontSize);
		g.drawAlignedText(t, [0, 0, this.getWidth(), this.getHeight()], "left");
	});
	
	toolTipPanel.setTimerCallback(function()
	{
		this.repaint();
	});
	
	toolTipPanel.startTimer(250);

}

//
inline function onfindButtonControl(component, value)
{
	Engine.openWebsite("https://tribeinstruments.com/products");
};

Content.getComponent("findButton").setControlCallback(onfindButtonControl);

inline function onScriptButton2Control(component, value)
{
	Engine.openWebsite("https://tribeinstruments.com/");
};

Content.getComponent("ScriptButton2").setControlCallback(onScriptButton2Control);

inline function onScriptButton3Control(component, value)
{
	Engine.openWebsite("https://tribeinstruments.com/tribeplayermanual");
};

Content.getComponent("ScriptButton3").setControlCallback(onScriptButton3Control);


