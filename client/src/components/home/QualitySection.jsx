import { GiTireIronCross } from 'react-icons/gi';

const QualitySection = () => {
  const services = [
    { name: 'Tire Repair', percentage: '95%' },
    { name: 'Wheel Balancing', percentage: '87%' },
    { name: 'Tire Installation', percentage: '76%' },
    { name: 'Product Quality', percentage: '96%' },
  ];

  const features = [
    {
      title: 'The Tire Leaking Fix & Repair',
      description: 'Curabitur sed facilisis erat. Vestibulum pharetra eros eget.',
    },
    {
      title: 'Emergency Tire Repair & Service',
      description: 'Curabitur sed facilisis erat. Vestibulum pharetra eros eget.',
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&q=80"
              alt="Quality Service"
              className="rounded-lg w-full"
            />
          </div>

          {/* Right - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiTireIronCross className="text-red-600 text-2xl" />
              <span className="text-red-600 font-medium">Quality Service</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              GET ALL YOUR CAR NEEDS<br />
              <span className="text-red-600">IN ONE STOP</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor.
              Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <GiTireIronCross className="text-red-600 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Bars */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold text-sm">{service.name}</span>
                    <span className="text-red-600 font-bold">{service.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: service.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
