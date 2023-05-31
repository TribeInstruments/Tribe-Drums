#pragma once

// These will improve the readability of the connection definition

#define getT(Idx) template get<Idx>()
#define connectT(Idx, target) template connect<Idx>(target)
#define getParameterT(Idx) template getParameter<Idx>()
#define setParameterT(Idx, value) template setParameter<Idx>(value)
#define setParameterWT(Idx, value) template setWrapParameter<Idx>(value)
using namespace scriptnode;
using namespace snex;
using namespace snex::Types;

namespace distortion_impl
{
// ==============================| Node & Parameter type declarations |==============================

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

template <int NV>
using snex_shaper_t = wrap::no_data<core::snex_shaper<Shape<NV>>>;

namespace distortion_t_parameters
{
// Parameter list for distortion_impl::distortion_t ------------------------------------------------

using Gain = parameter::plain<core::gain, 0>;
template <int NV>
using Drive = parameter::plain<distortion_impl::snex_shaper_t<NV>, 
                               0>;
using LowCut = parameter::plain<jdsp::jlinkwitzriley, 0>;
using HiCut = LowCut;
template <int NV>
using distortion_t_plist = parameter::list<Gain, 
                                           Drive<NV>, 
                                           LowCut, 
                                           HiCut>;
}

template <int NV>
using distortion_t_ = container::chain<distortion_t_parameters::distortion_t_plist<NV>, 
                                       wrap::fix<2, jdsp::jlinkwitzriley>, 
                                       jdsp::jlinkwitzriley, 
                                       core::gain, 
                                       snex_shaper_t<NV>, 
                                       core::gain>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public distortion_impl::distortion_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(distortion);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(64)
		{
			0x005B, 0x0000, 0x4700, 0x6961, 0x006E, 0x0000, 0x0000, 0x0000, 
            0x4270, 0x0000, 0x4270, 0x0000, 0x3F80, 0xCCCD, 0x3DCC, 0x015B, 
            0x0000, 0x4400, 0x6972, 0x6576, 0xCD00, 0xCCCC, 0x003D, 0x8000, 
            0x7A3F, 0x0ED8, 0x003F, 0x8000, 0x003F, 0x0000, 0x5B00, 0x0002, 
            0x0000, 0x6F4C, 0x4377, 0x7475, 0x0000, 0xA000, 0x0041, 0x9C40, 
            0xF246, 0xEC47, 0x1A42, 0x6B6C, 0x003E, 0x0000, 0x5B00, 0x0003, 
            0x0000, 0x6948, 0x7543, 0x0074, 0x0000, 0x41A0, 0x4000, 0x469C, 
            0x069D, 0x4669, 0x6C1A, 0x3E6B, 0x0000, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& jlinkwitzriley1 = this->getT(0); // jdsp::jlinkwitzriley
		auto& jlinkwitzriley = this->getT(1);  // jdsp::jlinkwitzriley
		auto& gain = this->getT(2);            // core::gain
		auto& snex_shaper = this->getT(3);     // distortion_impl::snex_shaper_t<NV>
		auto& gain1 = this->getT(4);           // core::gain
		
		// Parameter Connections -------------------------------------------------------------------
		
		this->getParameterT(0).connectT(0, gain); // Gain -> gain::Gain
		
		this->getParameterT(1).connectT(0, snex_shaper); // Drive -> snex_shaper::gain
		
		this->getParameterT(2).connectT(0, jlinkwitzriley1); // LowCut -> jlinkwitzriley1::Frequency
		
		this->getParameterT(3).connectT(0, jlinkwitzriley); // HiCut -> jlinkwitzriley::Frequency
		
		// Default Values --------------------------------------------------------------------------
		
		;                                     // jlinkwitzriley1::Frequency is automated
		jlinkwitzriley1.setParameterT(1, 1.); // jdsp::jlinkwitzriley::Type
		
		;                                    // jlinkwitzriley::Frequency is automated
		jlinkwitzriley.setParameterT(1, 0.); // jdsp::jlinkwitzriley::Type
		
		;                           // gain::Gain is automated
		gain.setParameterT(1, 20.); // core::gain::Smoothing
		gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		; // snex_shaper::gain is automated
		
		gain1.setParameterT(0, -34.); // core::gain::Gain
		gain1.setParameterT(1, 20.);  // core::gain::Smoothing
		gain1.setParameterT(2, 0.);   // core::gain::ResetValue
		
		this->setParameterT(0, 60.);
		this->setParameterT(1, 0.557991);
		this->setParameterT(2, 118.141);
		this->setParameterT(3, 14913.7);
		this->setExternalData({}, -1);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
	
	void setExternalData(const ExternalData& b, int index)
	{
		// External Data Connections ---------------------------------------------------------------
		
		this->getT(3).setExternalData(b, index); // distortion_impl::snex_shaper_t<NV>
	}
};
}

#undef getT
#undef connectT
#undef setParameterT
#undef setParameterWT
#undef getParameterT
// ======================================| Public Definition |======================================

namespace project
{
// polyphonic template declaration

template <int NV>
using distortion = wrap::node<distortion_impl::instance<NV>>;
}


