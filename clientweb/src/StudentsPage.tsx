function StudentsPage() {
  return (
    <div className="students-page">
      <select
        className="student-page-select"
        name="subject"
        id="subject"
        onChange={handleSelectChange}
        value={selectedSubject}
      >
        <option key={"all"} value={"all"} selected>
          All
        </option>
        {Object.values(CourseSubject).map((x, idx) => (
          <option key={idx} value={x}>
            {x}
          </option>
        ))}
      </select>
      <CourseList
        showSubject={showSubject}
        subject={selectedSubject}
        courses={courses}
      />
    </div>
  );
}
