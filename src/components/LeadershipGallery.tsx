'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface LeadershipItem {
  title: string;
  description: string;
  image?: string;
  date?: string;
  achievement?: string;
}

interface LeadershipGalleryProps {
  items: string[];
}

const LeadershipGallery = ({ items }: LeadershipGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Enhanced leadership data with images and details
  const enhancedLeadership: LeadershipItem[] = [
    {
      title: "Code Cubicle Hackathon Winner",
      description: "Secured victory in the prestigious hackathon organized by Microsoft, Pathway, and Trae AI. Developed an innovative solution that impressed industry experts.",
      image: "/leadership/hackathon-winner.jpg",
      date: "2024",
      achievement: "1st Place Winner"
    },
    {
      title: "Google Developer Groups Organizer",
      description: "Leading campus initiatives, organizing tech events, and guiding project development for fellow students. Building a strong developer community.",
      image: "/leadership/gdg-organizer.jpg",
      date: "2023 - Present",
      achievement: "Community Leader"
    },
    {
      title: "Microsoft Student Ambassador",
      description: "Conducting technical workshops, mentoring peers in cloud technologies, and representing Microsoft's mission in the academic community.",
      image: "/leadership/msa-ambassador.jpg",
      date: "2023 - Present",
      achievement: "Student Ambassador"
    }
  ];

  const galleryImages = [
    "/leadership/hackathon-winner.jpg",
    "/leadership/gdg-organizer.jpg", 
    "/leadership/msa-ambassador.jpg",
    "/leadership/workshop-1.jpg",
    "/leadership/workshop-2.jpg",
    "/leadership/team-meeting.jpg"
  ];

  return (
    <div className="glass-card rounded-2xl p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold gradient-text mb-6">Leadership & Activities</h3>
        
        {/* Scrolling Image Gallery */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-xl">
            <motion.div 
              className="flex gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            >
              {/* Duplicate images for seamless loop */}
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <motion.div
                  key={index}
                  className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.05, z: 10 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Leadership activity ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-110"
                    sizes="(max-width: 768px) 192px, 192px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Leadership Cards */}
        <div className="space-y-6">
          {enhancedLeadership.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                {/* Achievement Badge */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h4>
                    {item.achievement && (
                      <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                        {item.achievement}
                      </span>
                    )}
                  </div>
                  
                  {item.date && (
                    <p className="text-sm text-white/60 mb-3">{item.date}</p>
                  )}
                  
                  <p className="text-white/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Hover Effects */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10"
        >
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">3+</div>
            <div className="text-sm text-white/60">Leadership Roles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">50+</div>
            <div className="text-sm text-white/60">Students Mentored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">10+</div>
            <div className="text-sm text-white/60">Events Organized</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Leadership activity"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LeadershipGallery;