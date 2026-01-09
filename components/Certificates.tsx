import React from 'react';
import type { Certificate } from '../types';
import { Award, Download } from 'lucide-react';

interface CertificatesProps {
  certificates: Certificate[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {

  const handleDownload = (certificate: Certificate) => {
    const certificateHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate of Completion - ${certificate.courseName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Montserrat:ital,wght@0,700;1,400&display=swap');
          body { font-family: 'Poppins', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #0F172A; margin: 0; padding: 20px; box-sizing: border-box; }
          .certificate { font-family: 'Montserrat', sans-serif; border: 10px solid #0891b2; padding: 40px 60px; width: 100%; max-width: 800px; text-align: center; background-color: #1E293B; box-shadow: 0 10px 25px rgba(0,0,0,0.5); position: relative; color: #E2E8F0; }
          .title { font-size: 50px; font-weight: 700; color: #E2E8F0; }
          .subtitle { font-family: 'Poppins', sans-serif; font-size: 25px; margin-top: 20px; color: #94A3B8; }
          .name { font-size: 45px; font-style: italic; font-weight: 400; color: #00BCD4; margin: 40px 0; border-bottom: 2px solid #00BCD4; display: inline-block; padding-bottom: 5px; }
          .course { font-size: 30px; margin-bottom: 20px; font-weight: 700; color: #E2E8F0; }
          .date { font-family: 'Poppins', sans-serif; font-size: 20px; color: #94A3B8; margin-top: 40px; }
          .brand { position: absolute; top: 20px; left: 20px; font-size: 16px; font-weight: bold; color: #00BCD4; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="brand">AI Learning</div>
          <div class="title">Certificate of Completion</div>
          <div class="subtitle">This certificate is proudly presented to</div>
          <div class="name">${certificate.userName}</div>
          <div class="subtitle">for successfully completing the course</div>
          <div class="course">"${certificate.courseName}"</div>
          <div class="date">Awarded on: ${certificate.date}</div>
        </div>
      </body>
      </html>
    `;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(certificateHtml);
      newWindow.document.close();
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 font-montserrat flex items-center justify-center gap-4"><Award size={36} /> My Certificates</h1>
       {certificates.length === 0 ? (
        <div className="text-center text-gray-400 bg-slate-800 border border-slate-700 rounded-lg p-8 max-w-2xl mx-auto shadow-md">
            <h3 className="text-xl font-semibold text-gray-100">No Certificates Yet!</h3>
            <p className="mt-2">Complete a course to see your certificate appear here.</p>
        </div>
       ) : (
        <div className="max-w-4xl mx-auto space-y-4">
            {certificates.map((cert, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-center animate-fade-in-up shadow-sm">
                    <div>
                        <h3 className="font-bold text-lg text-cyan-400">{cert.courseName}</h3>
                        <p className="text-sm text-gray-400">Completed on: {cert.date}</p>
                    </div>
                    <button onClick={() => handleDownload(cert)} className="flex items-center gap-2 mt-4 sm:mt-0 px-4 py-2 bg-slate-700 text-gray-200 rounded-lg hover:bg-slate-600 transition-colors">
                        <Download size={16} /> Download
                    </button>
                </div>
            ))}
        </div>
       )}
    </div>
  );
};

export default Certificates;