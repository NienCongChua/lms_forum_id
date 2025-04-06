-- Tạo Database
CREATE DATABASE IF NOT EXISTS lms_forum_id;
USE lms_forum_id;

-- Bảng Users (Quản lý tất cả người dùng: student, teacher, admin)
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    -- Username VARCHAR(255) UNIQUE NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(500) NOT NULL,
    Role ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'student',
    Status ENUM('active', 'banned', 'inactive') DEFAULT 'active',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Categories (Danh mục khóa học & diễn đàn)
CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL
);

-- Bảng Courses (Thông tin khóa học)
CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    LongDescription TEXT,
    ThumbnailURL VARCHAR(255),
    CategoryID INT,
    Level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
    Duration INT UNSIGNED DEFAULT 0, -- Thời lượng (phút)
    Price DECIMAL(10, 2) DEFAULT 0.00,
    InstructorID INT, -- Giảng viên (tham chiếu Users)
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (InstructorID) REFERENCES Users(UserID)
);

-- Bảng CourseModules (Các module trong khóa học)
CREATE TABLE CourseModules (
    ModuleID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    ModuleOrder INT NOT NULL DEFAULT 1,
    Duration INT UNSIGNED DEFAULT 0,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE
);

-- Bảng Lessons (Bài học trong module)
CREATE TABLE Lessons (
    LessonID INT AUTO_INCREMENT PRIMARY KEY,
    ModuleID INT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    LessonOrder INT NOT NULL DEFAULT 1,
    Duration INT UNSIGNED DEFAULT 0,
    Type ENUM('video', 'quiz', 'reading') NOT NULL,
    Content TEXT,
    FOREIGN KEY (ModuleID) REFERENCES CourseModules(ModuleID) ON DELETE CASCADE
);

-- Bảng UserCourses (Học viên đăng ký khóa học)
CREATE TABLE UserCourses (
    UserID INT NOT NULL,
    CourseID INT NOT NULL,
    Progress TINYINT UNSIGNED DEFAULT 0,
    Status ENUM('enrolled', 'completed', 'dropped') NOT NULL DEFAULT 'enrolled',
    EnrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID, CourseID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE
);

-- Bảng Forums (Diễn đàn thảo luận)
CREATE TABLE Forums (
    ForumID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Content TEXT,
    CategoryID INT,
    AuthorID INT,
    Views INT DEFAULT 0,
    Likes INT DEFAULT 0,
    IsHot BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (AuthorID) REFERENCES Users(UserID)
);

-- Bảng Comments (Bình luận trên diễn đàn)
CREATE TABLE Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    ForumID INT NOT NULL,
    AuthorID INT NOT NULL,
    ParentCommentID INT NULL,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ForumID) REFERENCES Forums(ForumID) ON DELETE CASCADE,
    FOREIGN KEY (AuthorID) REFERENCES Users(UserID),
    FOREIGN KEY (ParentCommentID) REFERENCES Comments(CommentID) ON DELETE CASCADE
);

-- Bảng Tags (Tag cho diễn đàn và khóa học)
CREATE TABLE Tags (
    TagID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL
);

-- Bảng ForumTags (Quan hệ nhiều-nhiều giữa Forums và Tags)
CREATE TABLE ForumTags (
    ForumID INT NOT NULL,
    TagID INT NOT NULL,
    PRIMARY KEY (ForumID, TagID),
    FOREIGN KEY (ForumID) REFERENCES Forums(ForumID) ON DELETE CASCADE,
    FOREIGN KEY (TagID) REFERENCES Tags(TagID) ON DELETE CASCADE
);

-- Bảng CourseTags (Quan hệ nhiều-nhiều giữa Courses và Tags)
CREATE TABLE CourseTags (
    CourseID INT NOT NULL,
    TagID INT NOT NULL,
    PRIMARY KEY (CourseID, TagID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE,
    FOREIGN KEY (TagID) REFERENCES Tags(TagID) ON DELETE CASCADE
);

-- Bảng Resources (Tài liệu học tập)
CREATE TABLE Resources (
    ResourceID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Type VARCHAR(50),
    URL VARCHAR(255),
    FilePath VARCHAR(255) NULL, -- Nếu tài liệu được upload
    UploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Thêm Index để tối ưu truy vấn
CREATE INDEX idx_tagid_forumtags ON ForumTags(TagID);
CREATE INDEX idx_tagid_coursetags ON CourseTags(TagID);
