const var VelocityKnob = Content.addKnob("VelocityKnob", 0, 0);
const var VelocityKnob1 = Content.addKnob("VelocityKnob1", 128, 0);

VelocityKnob.set("text", "text-Velocity");
VelocityKnob.setRange(0, 127, 1);
VelocityKnob.set("suffix", "MAX");

VelocityKnob1.set("text", "text-Velocity");
VelocityKnob1.setRange(0, 127, 1);
VelocityKnob1.set("suffix", "MIN");function onNoteOn()
{
	if (Message.getVelocity() > VelocityKnob.getValue())
	{
		Message.setVelocity(VelocityKnob.getValue());
	}
	else if (Message.getVelocity() < VelocityKnob1.getValue())
	{
		Message.setVelocity(VelocityKnob1.getValue());
	}
	
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
 