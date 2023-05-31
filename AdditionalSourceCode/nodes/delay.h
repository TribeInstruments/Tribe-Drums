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

namespace delay_impl
{
// ==============================| Node & Parameter type declarations |==============================

using stereo_cable = cable::block<2>;

template <int NV>
using tempo_sync_t = wrap::mod<parameter::plain<core::fix_delay, 0>, 
                               control::tempo_sync<NV>>;

template <int NV>
using chain1_t = container::chain<parameter::empty, 
                                  wrap::fix<1, tempo_sync_t<NV>>, 
                                  core::fix_delay>;

template <int NV> using tempo_sync1_t = tempo_sync_t<NV>;

template <int NV>
using chain2_t = container::chain<parameter::empty, 
                                  wrap::fix<1, tempo_sync1_t<NV>>, 
                                  core::fix_delay>;

template <int NV>
using multi_t = container::multi<parameter::empty, 
                                 wrap::fix<1, chain1_t<NV>>, 
                                 wrap::fix<1, chain2_t<NV>>>;

template <int NV>
using Wet_t = container::chain<parameter::empty, 
                               wrap::fix<2, routing::receive<stereo_cable>>, 
                               filters::svf<NV>, 
                               multi_t<NV>, 
                               routing::send<stereo_cable>, 
                               core::gain>;

using Dry_t = container::chain<parameter::empty, 
                               wrap::fix<2, core::gain>>;

template <int NV>
using split1_t = container::split<parameter::empty, 
                                  wrap::fix<2, Wet_t<NV>>, 
                                  Dry_t>;

template <int NV>
using chain_t = container::chain<parameter::empty, 
                                 wrap::fix<2, split1_t<NV>>>;

namespace delay_t_parameters
{
// Parameter list for delay_impl::delay_t ----------------------------------------------------------

DECLARE_PARAMETER_RANGE_SKEW(DelayMixRange, 
                             -100., 
                             10., 
                             5.);

using DelayMix = parameter::from0To1<core::gain, 
                                     0, 
                                     DelayMixRange>;

template <int NV>
using DelayFilter = parameter::plain<filters::svf<NV>, 0>;
using DelayFeedback = parameter::plain<routing::receive<stereo_cable>, 
                                       0>;
template <int NV>
using DelayTimeLeft = parameter::plain<delay_impl::tempo_sync_t<NV>, 
                                       0>;
template <int NV>
using DelayTimeRight = parameter::plain<delay_impl::tempo_sync1_t<NV>, 
                                        0>;
template <int NV>
using delay_t_plist = parameter::list<DelayMix, 
                                      DelayFilter<NV>, 
                                      DelayFeedback, 
                                      DelayTimeLeft<NV>, 
                                      DelayTimeRight<NV>>;
}

template <int NV>
using delay_t_ = container::chain<delay_t_parameters::delay_t_plist<NV>, 
                                  wrap::fix<2, chain_t<NV>>>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public delay_impl::delay_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(delay);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(96)
		{
			0x005B, 0x0000, 0x4400, 0x6C65, 0x7961, 0x694D, 0x0078, 0x0000, 
            0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 
            0x0000, 0x015B, 0x0000, 0x4400, 0x6C65, 0x7961, 0x6946, 0x746C, 
            0x7265, 0x0000, 0xA000, 0x0041, 0x9C40, 0xF646, 0x94A3, 0x1A44, 
            0x6B6C, 0x003E, 0x0000, 0x5B00, 0x0002, 0x0000, 0x6544, 0x616C, 
            0x4679, 0x6565, 0x6264, 0x6361, 0x006B, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0x6921, 0x3EA9, 0x0000, 0x3F80, 0x0000, 0x0000, 0x035B, 
            0x0000, 0x4400, 0x6C65, 0x7961, 0x6954, 0x656D, 0x654C, 0x7466, 
            0x0000, 0x0000, 0x0000, 0x9000, 0x0041, 0xC000, 0x0040, 0x8000, 
            0x003F, 0x8000, 0x5B3F, 0x0004, 0x0000, 0x6544, 0x616C, 0x5479, 
            0x6D69, 0x5265, 0x6769, 0x7468, 0x0000, 0x0000, 0x0000, 0x9000, 
            0x0041, 0xA000, 0x0040, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& chain = this->getT(0);                                               // delay_impl::chain_t<NV>
		auto& split1 = this->getT(0).getT(0);                                      // delay_impl::split1_t<NV>
		auto& Wet = this->getT(0).getT(0).getT(0);                                 // delay_impl::Wet_t<NV>
		auto& receive = this->getT(0).getT(0).getT(0).getT(0);                     // routing::receive<stereo_cable>
		auto& svf = this->getT(0).getT(0).getT(0).getT(1);                         // filters::svf<NV>
		auto& multi = this->getT(0).getT(0).getT(0).getT(2);                       // delay_impl::multi_t<NV>
		auto& chain1 = this->getT(0).getT(0).getT(0).getT(2).getT(0);              // delay_impl::chain1_t<NV>
		auto& tempo_sync = this->getT(0).getT(0).getT(0).getT(2).getT(0).getT(0);  // delay_impl::tempo_sync_t<NV>
		auto& fix_delay = this->getT(0).getT(0).getT(0).getT(2).getT(0).getT(1);   // core::fix_delay
		auto& chain2 = this->getT(0).getT(0).getT(0).getT(2).getT(1);              // delay_impl::chain2_t<NV>
		auto& tempo_sync1 = this->getT(0).getT(0).getT(0).getT(2).getT(1).getT(0); // delay_impl::tempo_sync1_t<NV>
		auto& fix_delay1 = this->getT(0).getT(0).getT(0).getT(2).getT(1).getT(1);  // core::fix_delay
		auto& send = this->getT(0).getT(0).getT(0).getT(3);                        // routing::send<stereo_cable>
		auto& gain2 = this->getT(0).getT(0).getT(0).getT(4);                       // core::gain
		auto& Dry = this->getT(0).getT(0).getT(1);                                 // delay_impl::Dry_t
		auto& gain1 = this->getT(0).getT(0).getT(1).getT(0);                       // core::gain
		
		// Parameter Connections -------------------------------------------------------------------
		
		this->getParameterT(0).connectT(0, gain2); // DelayMix -> gain2::Gain
		
		this->getParameterT(1).connectT(0, svf); // DelayFilter -> svf::Frequency
		
		this->getParameterT(2).connectT(0, receive); // DelayFeedback -> receive::Feedback
		
		this->getParameterT(3).connectT(0, tempo_sync); // DelayTimeLeft -> tempo_sync::Tempo
		
		this->getParameterT(4).connectT(0, tempo_sync1); // DelayTimeRight -> tempo_sync1::Tempo
		
		// Modulation Connections ------------------------------------------------------------------
		
		tempo_sync.getParameter().connectT(0, fix_delay);   // tempo_sync -> fix_delay::DelayTime
		tempo_sync1.getParameter().connectT(0, fix_delay1); // tempo_sync1 -> fix_delay1::DelayTime
		
		// Send Connections ------------------------------------------------------------------------
		
		send.connect(receive);
		
		// Default Values --------------------------------------------------------------------------
		
		; // receive::Feedback is automated
		
		;                           // svf::Frequency is automated
		svf.setParameterT(1, 1.);   // filters::svf::Q
		svf.setParameterT(2, 0.);   // filters::svf::Gain
		svf.setParameterT(3, 0.01); // filters::svf::Smoothing
		svf.setParameterT(4, 0.);   // filters::svf::Mode
		svf.setParameterT(5, 1.);   // filters::svf::Enabled
		
		;                                   // tempo_sync::Tempo is automated
		tempo_sync.setParameterT(1, 1.);    // control::tempo_sync::Multiplier
		tempo_sync.setParameterT(2, 1.);    // control::tempo_sync::Enabled
		tempo_sync.setParameterT(3, 396.2); // control::tempo_sync::UnsyncedTime
		
		;                                 // fix_delay::DelayTime is automated
		fix_delay.setParameterT(1, 512.); // core::fix_delay::FadeTime
		
		;                                    // tempo_sync1::Tempo is automated
		tempo_sync1.setParameterT(1, 1.);    // control::tempo_sync::Multiplier
		tempo_sync1.setParameterT(2, 1.);    // control::tempo_sync::Enabled
		tempo_sync1.setParameterT(3, 364.4); // control::tempo_sync::UnsyncedTime
		
		;                                  // fix_delay1::DelayTime is automated
		fix_delay1.setParameterT(1, 512.); // core::fix_delay::FadeTime
		
		;                              // gain2::Gain is automated
		gain2.setParameterT(1, 20.);   // core::gain::Smoothing
		gain2.setParameterT(2, -100.); // core::gain::ResetValue
		
		gain1.setParameterT(0, -100.); // core::gain::Gain
		gain1.setParameterT(1, 20.);   // core::gain::Smoothing
		gain1.setParameterT(2, -100.); // core::gain::ResetValue
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1189.12);
		this->setParameterT(2, 0.33088);
		this->setParameterT(3, 6.);
		this->setParameterT(4, 5.);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool isProcessingHiseEvent() { return true; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
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
using delay = wrap::node<delay_impl::instance<NV>>;
}


