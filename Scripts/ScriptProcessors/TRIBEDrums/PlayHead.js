const var th = Engine.createTransportHandler();

const var SyncKnob = Content.addButton("Sync", 0, 0);

SyncKnob.set("text", "text-Sync");
SyncKnob.set("saveInPreset", 0);

const var MIDIPlayerHead = Synth.getMidiPlayer("MIDI Player1");

th.setEnableGrid(true, 8);

th.setSyncMode(th.PreferExternal);

th.startInternalClock(0);

inline function onSyncControl(component, value)
{
	MIDIPlayerHead.setSyncToMasterClock(value);
};

Content.getComponent("Sync").setControlCallback(onSyncControl);


/*inline function onTransport(isPlaying)
{
	if (isPlaying)
	{
		MIDIPlayerHead.play(1);
	}
	else if (!isPlaying)
	{
		MIDIPlayerHead.stop(1);
	}
};

th.setOnTransportChange(true, onTransport);

*/
function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 