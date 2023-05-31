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

namespace ChMeter
{

	inline function createChMeter(name, x, y)
	{
		local widget = Content.addPanel(name, x, y);
    
		Content.setPropertiesFromJSON(name, {
		"width": 3,
		"height": 148,
		"saveInPreset": false,
		"opaque": 0,
		"borderRadius": 13.0,
		"borderSize": 7.0,
		"bgColour": Theme.DarkColor,
		"itemColour": Theme.MainColor,
		"textColour": 0xFFFFFFFF 
		});
    	
		widget.setPaintRoutine(function(g)
		{
			g.fillAll(this.get("bgColour"));
			
			g.setColour(this.get("itemColour"));
			//g.setGradientFill([this.get("itemColour"), 10, 80, this.get("textColour"), 10, 10]);
    	
			var lsize = parseInt(this.data.lvalue * (this.getHeight()-4));
			//var rsize = parseInt(this.data.rvalue * (this.getHeight()-4));
    	
			g.fillRect([2, this.getHeight() - lsize - 2, this.getWidth() - 4, lsize]);
			//g.fillRect([2 + this.getWidth() / 2 - 1, this.getHeight() - rsize - 2, (this.getWidth()-4)/2-1, rsize]);
    	
			//g.setColour(this.get("itemColour2"));
    	
			/*for(i = 1; i < this.getHeight()-1; i = i + 3)
			{
				g.fillRect([1, i, this.getWidth()-2, 1]);
			}*/
		});
    
		widget.setTimerCallback(function()
		{
			var lvalue;
			//var rvalue;
			
			if(this.data.fx)
			{
				lvalue = getNormalizedPeakValue(this.data.fx.getCurrentLevel(1));
				//rvalue = getNormalizedPeakValue(this.data.fx.getCurrentLevel(0));
			}
			else
			{
				lvalue = getNormalizedPeakValue(Engine.getMasterPeakLevel(1));
				//rvalue = getNormalizedPeakValue(Engine.getMasterPeakLevel(0));
			}
			
			
    	
			this.data.lvalue = Math.max(lvalue, this.data.lvalue - 0.04);
			//this.data.rvalue = Math.max(rvalue, this.data.rvalue - 0.04);
    	
			this.repaint();
		});
    	
    	widget.startTimer(90);
   	
		return widget;
	};

	inline function setModule(chMeter, module)
	{
		chMeter.data.fx = module;
	}
	
	inline function getNormalizedPeakValue(gain)
	{
		return 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));
	}
	
	
}



const var ChMeter1 = ChMeter.createChMeter("ChMeter1", 8, 45);
ChMeter1.set("height", 80);
ChMeter.setModule(ChMeter1, Synth.getEffect("Ch0"));

const var ChMeter2 = ChMeter.createChMeter("ChMeter2", 8, 45);
ChMeter2.set("height", 80);
ChMeter.setModule(ChMeter2, Synth.getEffect("Ch1"));

const var ChMeter3 = ChMeter.createChMeter("ChMeter3", 8, 45);
ChMeter3.set("height", 80);
ChMeter.setModule(ChMeter3, Synth.getEffect("Ch2"));

const var ChMeter4 = ChMeter.createChMeter("ChMeter4", 8, 45);
ChMeter4.set("height", 80);
ChMeter.setModule(ChMeter4, Synth.getEffect("Ch3"));

const var ChMeter5 = ChMeter.createChMeter("ChMeter5", 8, 45);
ChMeter5.set("height", 80);
ChMeter.setModule(ChMeter5, Synth.getEffect("Ch4"));

const var ChMeter6 = ChMeter.createChMeter("ChMeter6", 8, 45);
ChMeter6.set("height", 80);
ChMeter.setModule(ChMeter6, Synth.getEffect("Ch5"));

const var ChMeter7 = ChMeter.createChMeter("ChMeter7", 8, 45);
ChMeter7.set("height", 80);
ChMeter.setModule(ChMeter7, Synth.getEffect("Ch6"));

const var ChMeter8 = ChMeter.createChMeter("ChMeter8", 8, 45);
ChMeter8.set("height", 80);
ChMeter.setModule(ChMeter8, Synth.getEffect("Ch7"));

const var ChMeter9 = ChMeter.createChMeter("ChMeter9", 8, 45);
ChMeter9.set("height", 80);
ChMeter.setModule(ChMeter9, Synth.getEffect("Ch8"));

const var ChMeter10 = ChMeter.createChMeter("ChMeter10", 8, 45);
ChMeter10.set("height", 80);
ChMeter.setModule(ChMeter10, Synth.getEffect("Ch9"));

const var ChMeter11 = ChMeter.createChMeter("ChMeter11", 8, 45);
ChMeter11.set("height", 80);
ChMeter.setModule(ChMeter11, Synth.getEffect("Ch10"));

const var ChMeter12 = ChMeter.createChMeter("ChMeter12", 8, 45);
ChMeter12.set("height", 80);
ChMeter.setModule(ChMeter12, Synth.getEffect("Ch11"));



inline function onhideMetersButtonControl(component, value)
{
	for(i = 0; i < 12; i++)
		Content.getComponent("ChMeter" + (i+1)).showControl(value);
	
};

Content.getComponent("hideMetersButton").setControlCallback(onhideMetersButtonControl);
