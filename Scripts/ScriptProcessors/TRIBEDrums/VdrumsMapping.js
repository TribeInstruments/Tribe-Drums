const var map = Engine.createMidiList();

//Toms
map.setValue(41, 67); //Tom 1 Open
map.setValue(50, 63); //Tom 1 Rim

map.setValue(45, 69); //Tom 2 Open
map.setValue(47, 68); //Tom 2 Rim

map.setValue(48, 71); //Tom 3 Open
map.setValue(39, 61); //Tom 3 Rim

//Ride

map.setValue(59, 50); //Ride Shaft
map.setValue(51, 48); //Ride Tip

//Crash 1

map.setValue(55, 74); //Crash 1 Shaft
map.setValue(49, 72); //Crash 1 Tip

//Crash 2

map.setValue(52, 79); //Crash 2 Shaft
map.setValue(57, 77); //crash 2 Tip

//Fix



function onNoteOn()
{
	if (map.getValue(Message.getNoteNumber()) != -1)
	    {
	        Message.setNoteNumber(map.getValue(Message.getNoteNumber()));
	    }
}
 function onNoteOff()
{
	if (map.getValue(Message.getNoteNumber()) != -1)
	    {   
	    	Message.setNoteNumber(map.getValue(Message.getNoteNumber()));
	    }
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
 