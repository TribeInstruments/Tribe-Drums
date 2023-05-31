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

namespace Compressor_impl
{
// ==============================| Node & Parameter type declarations |==============================

using converter_t = control::converter<parameter::plain<core::gain, 0>, 
                                       conversion_logic::gain2db>;

struct cable_table_t_data
{
	span<float, 512> data =
	{
		1.f, 0.995738f, 0.991476f, 0.987215f, 0.982953f, 0.978691f,
		0.974429f, 0.970167f, 0.965906f, 0.961644f, 0.957426f, 0.953404f,
		0.949381f, 0.945358f, 0.941336f, 0.937313f, 0.93329f, 0.929268f,
		0.925245f, 0.921223f, 0.9172f, 0.913392f, 0.909591f, 0.90579f,
		0.901988f, 0.898187f, 0.894386f, 0.890584f, 0.886783f, 0.882982f,
		0.87918f, 0.875453f, 0.871857f, 0.868261f, 0.864665f, 0.861069f,
		0.857473f, 0.853877f, 0.850281f, 0.846685f, 0.843089f, 0.839493f,
		0.835965f, 0.83256f, 0.829155f, 0.82575f, 0.822344f, 0.818939f,
		0.815534f, 0.812129f, 0.808724f, 0.805319f, 0.801914f, 0.798509f,
		0.795274f, 0.792047f, 0.78882f, 0.785593f, 0.782366f, 0.779139f,
		0.775913f, 0.772686f, 0.769459f, 0.766232f, 0.763005f, 0.759803f,
		0.756743f, 0.753683f, 0.750623f, 0.747562f, 0.744502f, 0.741442f,
		0.738381f, 0.735321f, 0.732261f, 0.7292f, 0.72614f, 0.72308f,
		0.720168f, 0.717264f, 0.71436f, 0.711456f, 0.708551f, 0.705647f,
		0.702743f, 0.699839f, 0.696934f, 0.69403f, 0.691126f, 0.688222f,
		0.68537f, 0.682612f, 0.679855f, 0.677097f, 0.674339f, 0.671582f,
		0.668824f, 0.666066f, 0.663308f, 0.660551f, 0.657793f, 0.655035f,
		0.652278f, 0.649571f, 0.646951f, 0.644331f, 0.641711f, 0.639091f,
		0.636471f, 0.633851f, 0.631231f, 0.628612f, 0.625992f, 0.623372f,
		0.620752f, 0.618132f, 0.615512f, 0.61302f, 0.61053f, 0.60804f,
		0.60555f, 0.60306f, 0.60057f, 0.59808f, 0.59559f, 0.5931f,
		0.59061f, 0.58812f, 0.58563f, 0.58314f, 0.580674f, 0.578306f,
		0.575939f, 0.573572f, 0.571204f, 0.568837f, 0.56647f, 0.564102f,
		0.561735f, 0.559367f, 0.557f, 0.554633f, 0.552265f, 0.549898f,
		0.547532f, 0.545281f, 0.543029f, 0.540778f, 0.538526f, 0.536275f,
		0.534024f, 0.531772f, 0.529521f, 0.527269f, 0.525018f, 0.522767f,
		0.520515f, 0.518264f, 0.516012f, 0.513808f, 0.511667f, 0.509525f,
		0.507384f, 0.505242f, 0.503101f, 0.500959f, 0.498817f, 0.496676f,
		0.494534f, 0.492392f, 0.490251f, 0.488109f, 0.485968f, 0.483826f,
		0.481732f, 0.479694f, 0.477657f, 0.47562f, 0.473582f, 0.471545f,
		0.469507f, 0.46747f, 0.465432f, 0.463395f, 0.461357f, 0.45932f,
		0.457282f, 0.455245f, 0.453207f, 0.451178f, 0.44924f, 0.447301f,
		0.445362f, 0.443424f, 0.441485f, 0.439547f, 0.437608f, 0.435669f,
		0.433731f, 0.431792f, 0.429854f, 0.427915f, 0.425977f, 0.424038f,
		0.422099f, 0.42019f, 0.418346f, 0.416501f, 0.414657f, 0.412812f,
		0.410967f, 0.409123f, 0.407278f, 0.405434f, 0.403589f, 0.401745f,
		0.3999f, 0.398056f, 0.396211f, 0.394367f, 0.392522f, 0.390691f,
		0.388935f, 0.38718f, 0.385425f, 0.38367f, 0.381915f, 0.38016f,
		0.378405f, 0.37665f, 0.374895f, 0.37314f, 0.371385f, 0.36963f,
		0.367875f, 0.36612f, 0.364365f, 0.36261f, 0.360905f, 0.359235f,
		0.357565f, 0.355896f, 0.354226f, 0.352556f, 0.350887f, 0.349217f,
		0.347547f, 0.345877f, 0.344208f, 0.342538f, 0.340868f, 0.339199f,
		0.337529f, 0.335859f, 0.33419f, 0.33257f, 0.330982f, 0.329394f,
		0.327806f, 0.326217f, 0.324629f, 0.323041f, 0.321453f, 0.319864f,
		0.318276f, 0.316688f, 0.3151f, 0.313511f, 0.311923f, 0.310335f,
		0.308747f, 0.307158f, 0.30559f, 0.30408f, 0.30257f, 0.301059f,
		0.299549f, 0.298038f, 0.296528f, 0.295017f, 0.293507f, 0.291996f,
		0.290486f, 0.288975f, 0.287465f, 0.285954f, 0.284444f, 0.282933f,
		0.281423f, 0.279913f, 0.27844f, 0.277004f, 0.275568f, 0.274132f,
		0.272695f, 0.271259f, 0.269823f, 0.268387f, 0.266951f, 0.265515f,
		0.264079f, 0.262643f, 0.261207f, 0.259771f, 0.258335f, 0.256899f,
		0.255463f, 0.254026f, 0.252616f, 0.251251f, 0.249886f, 0.248521f,
		0.247156f, 0.245791f, 0.244426f, 0.243061f, 0.241697f, 0.240332f,
		0.238967f, 0.237602f, 0.236237f, 0.234872f, 0.233507f, 0.232142f,
		0.230778f, 0.229413f, 0.228048f, 0.226738f, 0.225441f, 0.224145f,
		0.222848f, 0.221551f, 0.220255f, 0.218958f, 0.217661f, 0.216365f,
		0.215068f, 0.213771f, 0.212475f, 0.211178f, 0.209881f, 0.208585f,
		0.207288f, 0.205991f, 0.204695f, 0.203398f, 0.202158f, 0.200926f,
		0.199695f, 0.198464f, 0.197233f, 0.196001f, 0.19477f, 0.193539f,
		0.192308f, 0.191076f, 0.189845f, 0.188614f, 0.187383f, 0.186152f,
		0.18492f, 0.183689f, 0.182458f, 0.181227f, 0.179995f, 0.178797f,
		0.177628f, 0.17646f, 0.175291f, 0.174123f, 0.172954f, 0.171786f,
		0.170617f, 0.169449f, 0.16828f, 0.167112f, 0.165944f, 0.164775f,
		0.163607f, 0.162438f, 0.16127f, 0.160101f, 0.158933f, 0.157764f,
		0.156596f, 0.155474f, 0.154366f, 0.153258f, 0.15215f, 0.151042f,
		0.149934f, 0.148826f, 0.147717f, 0.146609f, 0.145501f, 0.144393f,
		0.143285f, 0.142177f, 0.141069f, 0.13996f, 0.138852f, 0.137744f,
		0.136636f, 0.135528f, 0.13442f, 0.133349f, 0.132299f, 0.131248f,
		0.130198f, 0.129148f, 0.128098f, 0.127048f, 0.125998f, 0.124947f,
		0.123897f, 0.122847f, 0.121797f, 0.120747f, 0.119697f, 0.118647f,
		0.117596f, 0.116546f, 0.115496f, 0.114446f, 0.113396f, 0.112351f,
		0.111357f, 0.110363f, 0.109368f, 0.108374f, 0.10738f, 0.106385f,
		0.105391f, 0.104397f, 0.103402f, 0.102408f, 0.101413f, 0.100419f,
		0.0994247f, 0.0984303f, 0.0974359f, 0.0964416f, 0.0954472f, 0.0944528f,
		0.0934584f, 0.092464f, 0.0914791f, 0.0905384f, 0.0895977f, 0.0886571f,
		0.0877164f, 0.0867757f, 0.085835f, 0.0848944f, 0.0839537f, 0.0830131f,
		0.0820724f, 0.0811317f, 0.080191f, 0.0792504f, 0.0783097f, 0.077369f,
		0.0764284f, 0.0754877f, 0.0745471f, 0.0736064f, 0.0726657f, 0.071725f,
		0.0708281f, 0.0699393f, 0.0690503f, 0.0681614f, 0.0672725f, 0.0663835f,
		0.0654946f, 0.0646057f, 0.0637168f, 0.0628278f, 0.0619389f, 0.06105f,
		0.0601611f, 0.0592721f, 0.0583832f, 0.0574943f, 0.0566053f, 0.0557164f,
		0.0548275f, 0.0539386f, 0.0530496f, 0.0521668f, 0.0513278f, 0.0504887f,
		0.0496497f, 0.0488106f, 0.0479715f, 0.0471326f, 0.0462935f, 0.0454544f,
		0.0446154f, 0.0437764f, 0.0429373f, 0.0420983f, 0.0412592f, 0.0404202f,
		0.0395812f, 0.0387421f, 0.0379031f, 0.037064f, 0.036225f, 0.035386f,
		0.0345469f, 0.0337079f
	};
};

using cable_table_t = wrap::data<control::cable_table<parameter::plain<converter_t, 0>>, 
                                 data::embedded::table<cable_table_t_data>>;
using comp_t = wrap::mod<parameter::plain<cable_table_t, 0>, 
                         wrap::data<dynamics::comp, data::external::displaybuffer<0>>>;

template <int NV>
using detector_t = container::chain<parameter::empty, 
                                    wrap::fix<2, filters::svf_eq<NV>>, 
                                    filters::svf_eq<NV>, 
                                    comp_t, 
                                    math::mul<NV>>;

using proccess_t = container::chain<parameter::empty, 
                                    wrap::fix<2, cable_table_t>, 
                                    converter_t, 
                                    core::gain, 
                                    core::gain>;

template <int NV>
using split_t = container::split<parameter::empty, 
                                 wrap::fix<2, detector_t<NV>>, 
                                 proccess_t>;

template <int NV>
using frame2_block_t_ = container::chain<parameter::empty, 
                                         wrap::fix<2, split_t<NV>>>;

template <int NV>
using frame2_block_t = wrap::frame<2, frame2_block_t_<NV>>;

namespace Compressor_t_parameters
{
// Parameter list for Compressor_impl::Compressor_t ------------------------------------------------

using Threshold = parameter::plain<Compressor_impl::comp_t, 
                                   0>;
using Attack = parameter::plain<Compressor_impl::comp_t, 
                                1>;
using Release = parameter::plain<Compressor_impl::comp_t, 
                                 2>;
using Ratio = parameter::plain<Compressor_impl::comp_t, 
                               3>;
using MakeUp = parameter::plain<core::gain, 0>;
using Compressor_t_plist = parameter::list<Threshold, 
                                           Attack, 
                                           Release, 
                                           Ratio, 
                                           MakeUp>;
}

template <int NV>
using Compressor_t_ = container::chain<Compressor_t_parameters::Compressor_t_plist, 
                                       wrap::fix<2, frame2_block_t<NV>>>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public Compressor_impl::Compressor_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 1;
		
		SNEX_METADATA_ID(Compressor);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(82)
		{
			0x005B, 0x0000, 0x5400, 0x7268, 0x7365, 0x6F68, 0x646C, 0x0000, 
            0xC800, 0x00C2, 0x0000, 0x0000, 0x0000, 0x0000, 0x8000, 0xCD3F, 
            0xCCCC, 0x5B3D, 0x0001, 0x0000, 0x7441, 0x6174, 0x6B63, 0x0000, 
            0xC000, 0x003F, 0x7A00, 0xCD43, 0x60CC, 0xA342, 0xDC81, 0xCD3E, 
            0xCCCC, 0x5B3D, 0x0002, 0x0000, 0x6552, 0x656C, 0x7361, 0x0065, 
            0x0000, 0x4120, 0x0000, 0x447A, 0x0000, 0x4353, 0x81A3, 0x3EDC, 
            0xCCCD, 0x3DCC, 0x035B, 0x0000, 0x5200, 0x7461, 0x6F69, 0x0000, 
            0x8000, 0x003F, 0x0000, 0x0042, 0x0000, 0x9D42, 0x97F6, 0xCD3E, 
            0xCCCC, 0x5B3D, 0x0004, 0x0000, 0x614D, 0x656B, 0x7055, 0x0000, 
            0x0000, 0x0000, 0xF000, 0x0041, 0x0000, 0x0000, 0x8000, 0xCD3F, 
            0xCCCC, 0x003D
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& frame2_block = this->getT(0);                        // Compressor_impl::frame2_block_t<NV>
		auto& split = this->getT(0).getT(0);                       // Compressor_impl::split_t<NV>
		auto& detector = this->getT(0).getT(0).getT(0);            // Compressor_impl::detector_t<NV>
		auto& svf_eq = this->getT(0).getT(0).getT(0).getT(0);      // filters::svf_eq<NV>
		auto& svf_eq1 = this->getT(0).getT(0).getT(0).getT(1);     // filters::svf_eq<NV>
		auto& comp = this->getT(0).getT(0).getT(0).getT(2);        // Compressor_impl::comp_t
		auto& mul = this->getT(0).getT(0).getT(0).getT(3);         // math::mul<NV>
		auto& proccess = this->getT(0).getT(0).getT(1);            // Compressor_impl::proccess_t
		auto& cable_table = this->getT(0).getT(0).getT(1).getT(0); // Compressor_impl::cable_table_t
		auto& converter = this->getT(0).getT(0).getT(1).getT(1);   // Compressor_impl::converter_t
		auto& gain = this->getT(0).getT(0).getT(1).getT(2);        // core::gain
		auto& gain1 = this->getT(0).getT(0).getT(1).getT(3);       // core::gain
		
		// Parameter Connections -------------------------------------------------------------------
		
		this->getParameterT(0).connectT(0, comp); // Threshold -> comp::Threshhold
		
		this->getParameterT(1).connectT(0, comp); // Attack -> comp::Attack
		
		this->getParameterT(2).connectT(0, comp); // Release -> comp::Release
		
		this->getParameterT(3).connectT(0, comp); // Ratio -> comp::Ratio
		
		this->getParameterT(4).connectT(0, gain1); // MakeUp -> gain1::Gain
		
		// Modulation Connections ------------------------------------------------------------------
		
		converter.getWrappedObject().getParameter().connectT(0, gain);        // converter -> gain::Gain
		cable_table.getWrappedObject().getParameter().connectT(0, converter); // cable_table -> converter::Value
		comp.getParameter().connectT(0, cable_table);                         // comp -> cable_table::Value
		
		// Default Values --------------------------------------------------------------------------
		
		svf_eq.setParameterT(0, 635.922);  // filters::svf_eq::Frequency
		svf_eq.setParameterT(1, 0.493955); // filters::svf_eq::Q
		svf_eq.setParameterT(2, -9.98581); // filters::svf_eq::Gain
		svf_eq.setParameterT(3, 0.01);     // filters::svf_eq::Smoothing
		svf_eq.setParameterT(4, 2.);       // filters::svf_eq::Mode
		svf_eq.setParameterT(5, 1.);       // filters::svf_eq::Enabled
		
		svf_eq1.setParameterT(0, 2437.67); // filters::svf_eq::Frequency
		svf_eq1.setParameterT(1, 1.49264); // filters::svf_eq::Q
		svf_eq1.setParameterT(2, 11.5102); // filters::svf_eq::Gain
		svf_eq1.setParameterT(3, 0.01);    // filters::svf_eq::Smoothing
		svf_eq1.setParameterT(4, 4.);      // filters::svf_eq::Mode
		svf_eq1.setParameterT(5, 1.);      // filters::svf_eq::Enabled
		
		;                          // comp::Threshhold is automated
		;                          // comp::Attack is automated
		;                          // comp::Release is automated
		;                          // comp::Ratio is automated
		comp.setParameterT(4, 0.); // dynamics::comp::Sidechain
		
		mul.setParameterT(0, 0.); // math::mul::Value
		
		; // cable_table::Value is automated
		
		; // converter::Value is automated
		
		;                          // gain::Gain is automated
		gain.setParameterT(1, 0.); // core::gain::Smoothing
		gain.setParameterT(2, 0.); // core::gain::ResetValue
		
		;                            // gain1::Gain is automated
		gain1.setParameterT(1, 20.); // core::gain::Smoothing
		gain1.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 0.);
		this->setParameterT(1, 56.2);
		this->setParameterT(2, 211.);
		this->setParameterT(3, 32.);
		this->setParameterT(4, 0.);
		this->setExternalData({}, -1);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
	
	void setExternalData(const ExternalData& b, int index)
	{
		// External Data Connections ---------------------------------------------------------------
		
		this->getT(0).getT(0).getT(0).getT(2).setExternalData(b, index); // Compressor_impl::comp_t
		this->getT(0).getT(0).getT(1).getT(0).setExternalData(b, index); // Compressor_impl::cable_table_t
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
using Compressor = wrap::node<Compressor_impl::instance<NV>>;
}


