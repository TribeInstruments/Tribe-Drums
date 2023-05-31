template <int NumVoices> struct Shape
{
	SNEX_NODE(Shape);
	
	float gain = 0.0f;
	
	// Implement the Waveshaper here...
	
	float getSample(float input)
	{
		//return (1.0f + gain) * input / (1.0f + gain * Math.abs(input));
		
		return (Math.tanh(gain * input) / Math.tanh(gain));
	}
	// These functions are the glue code that call the function above
	template <typename T> void process(T& data)
	{
		for(auto ch: data)
		{
			for(auto& s: data.toChannelData(ch))
			{
				s = getSample(s);
			}
		}
	}
	template <typename T> void processFrame(T& data)
	{
		for(auto& s: data)
			s = getSample(s);
	}
	void reset()
	{
		
	}
	void prepare(PrepareSpecs ps)
	{
		
	}
	
	void setExternalData(const ExternalData& d, int index)
	{
	}
	template <int P> void setParameter(double v)
	{
	//if (P == 0)
	gain = (float)v;

	}
};
