import React from "react";

const ProgramCard = ({ program }:{program: any }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg px-6 py-4">
      {/* Header Section */}
      <div className="relative">
        <div className="h-32 relative overflow-hidden">
          <img
            className="absolute opacity-50 inset-0 w-full h-full object-cover"
            src="/card-bg.jpg"
            alt="Program Background"
          />
        </div>
        <div className="font-bold absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4">
          <div className="text-xl">{program.university}</div>
          <div className="text-sm">{program.location}</div>
          <div className="text-sm">{program.degreeType}</div>
          <div className="text-sm">{program.subject}</div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="font-bold text-sm">
          Required Degree <div className="opacity-45">{program.requiredDegree}</div>
        </div>
        <div className="font-bold text-sm">
          Tuition Fee <div className="opacity-45">{program.tuitionFee}</div>
        </div>
        <div className="font-bold text-sm">
          Required GPA <div className="opacity-45">{program.requiredGpa}</div>
        </div>
        <div className="font-bold text-sm">
          English Test <div className="opacity-45">{program.englishLanguageTestScore}</div>
        </div>
        <div className="font-bold text-sm">
          German Test <div className="opacity-45">{program.germanLanguageTestScore}</div>
        </div>
        <div className="font-bold text-sm">
          GRE Score <div className="opacity-45">{program.greScore}</div>
        </div>
        <div className="font-bold text-sm">
          Admission Type <div className="opacity-45">{program.admissionType}</div>
        </div>
        <div className="font-bold text-sm">
          Admission Session <div className="opacity-45">{program.admissionSession}</div>
        </div>
        <div className="font-bold text-sm">
          Course Website <div className="underline opacity-45">{program.courseWebsite}</div>
        </div>
        <div className="font-bold text-sm">
          Apply Via <div className="opacity-45">{program.applyVia}</div>
        </div>
        <div className="font-bold text-sm">
          Language of Study <div className="opacity-45">{program.languageOfStudy}</div>
        </div>
        <div className="font-bold text-sm">
          Application Start Date (Summer){" "}
          <div className="opacity-45">
            {program.appStartDateSummer || "Not Available"}
          </div>
        </div>
        <div className="font-bold text-sm">
          Application Start Date (Winter){" "}
          <div className="opacity-45">
            {program.appStartDateWinter || "Not Available"}
          </div>
        </div>
        <div className="font-bold text-sm">
          Application End Date (Summer){" "}
          <div className="opacity-45">{program.appEndDateSummer}</div>
        </div>
        <div className="font-bold text-sm">
          Application End Date (Winter){" "}
          <div className="opacity-45">{program.appEndDateWinter}</div>
        </div>
        <div className="font-bold text-sm">
          Program Duration <div className="opacity-45">{program.programDuration}</div>
        </div>
        <div className="font-bold text-sm">
          ECTS <div className="opacity-45">{program.ects}</div>
        </div>
        <div className="font-bold text-sm">
          Selection Procedure <div className="opacity-45">{program.selectionProcedure}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
