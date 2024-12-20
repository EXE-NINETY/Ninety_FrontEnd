USE [master]
GO
/****** Object:  Database [Ninety]    Script Date: 10/15/2024 11:48:42 PM ******/
CREATE DATABASE [Ninety]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Ninety', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Ninety.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Ninety_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Ninety_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Ninety] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Ninety].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Ninety] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Ninety] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Ninety] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Ninety] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Ninety] SET ARITHABORT OFF 
GO
ALTER DATABASE [Ninety] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Ninety] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Ninety] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Ninety] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Ninety] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Ninety] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Ninety] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Ninety] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Ninety] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Ninety] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Ninety] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Ninety] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Ninety] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Ninety] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Ninety] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Ninety] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Ninety] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Ninety] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Ninety] SET  MULTI_USER 
GO
ALTER DATABASE [Ninety] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Ninety] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Ninety] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Ninety] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Ninety] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Ninety] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Ninety] SET QUERY_STORE = OFF
GO
USE [Ninety]
GO
/****** Object:  Table [dbo].[BadmintonMatchDetails]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BadmintonMatchDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[APointSet1] [int] NOT NULL,
	[BPointSet1] [int] NOT NULL,
	[APointSet2] [int] NOT NULL,
	[BPointSet2] [int] NOT NULL,
	[APointSet3] [int] NULL,
	[BPointSet3] [int] NULL,
	[MatchId] [int] NOT NULL,
 CONSTRAINT [PK_BadmintonMatchDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Matchs]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Matchs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeamA] [int] NOT NULL,
	[TeamB] [int] NOT NULL,
	[WinningTeam] [int] NOT NULL,
	[TotalResult] [nvarchar](50) NOT NULL,
	[Bracket] [nvarchar](50) NULL,
	[Round] [nvarchar](50) NULL,
	[Date] [datetime] NULL,
	[TournamentId] [int] NOT NULL,
 CONSTRAINT [PK_Matchs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[Id] [int] NOT NULL,
	[Amount] [decimal](10, 0) NOT NULL,
	[PaymentStatus] [int] NOT NULL,
	[DateTime] [datetime] NULL,
	[Description] [nvarchar](250) NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ranking]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ranking](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Point] [int] NOT NULL,
	[Rank] [int] NOT NULL,
	[TournamentId] [int] NOT NULL,
	[TeamId] [int] NOT NULL,
 CONSTRAINT [PK_Ranking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sports]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Sports] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeamDetails]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeamDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[TeamId] [int] NOT NULL,
 CONSTRAINT [PK_TeamDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teams]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teams](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[TournamentId] [int] NOT NULL,
 CONSTRAINT [PK_Teams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tournaments]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tournaments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Rules] [nvarchar](max) NULL,
	[Format] [nvarchar](100) NOT NULL,
	[NumOfParticipants] [int] NOT NULL,
	[SlotLeft] [int] NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[Fee] [float] NOT NULL,
	[IsRegister] [bit] NULL,
	[CreateMatch] [bit] NULL,
	[Place] [nvarchar](100) NOT NULL,
	[SportId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Tournaments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/15/2024 11:48:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Role] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](11) NOT NULL,
	[UserStatus] [int] NULL,
	[Gender] [int] NOT NULL,
	[DateOfBirth] [datetime] NULL,
	[Nationality] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BadmintonMatchDetails] ON 

INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (0, 8, 0, 9, 0, 0, 0, 4)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (1, 21, 19, 18, 21, 21, 19, 1)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (3, 0, 0, 0, 0, NULL, NULL, 6)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (4, 0, 0, 0, 0, NULL, NULL, 7)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (5, 0, 0, 0, 0, NULL, NULL, 8)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (6, 0, 0, 0, 0, NULL, NULL, 9)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (7, 0, 0, 0, 0, NULL, NULL, 10)
INSERT [dbo].[BadmintonMatchDetails] ([Id], [APointSet1], [BPointSet1], [APointSet2], [BPointSet2], [APointSet3], [BPointSet3], [MatchId]) VALUES (8, 0, 0, 0, 0, NULL, NULL, 11)
SET IDENTITY_INSERT [dbo].[BadmintonMatchDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Matchs] ON 

INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (1, 1, 2, 1, N'2-0', NULL, NULL, CAST(N'2024-10-02T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (2, 3, 4, 3, N'3-2', NULL, NULL, CAST(N'2024-11-11T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (4, 3, 4, 3, N'2-0', NULL, NULL, CAST(N'2024-10-09T19:47:23.490' AS DateTime), 2)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (6, 14, 17, 0, N'Not happened yet', NULL, N'1', CAST(N'2024-12-01T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (7, 15, 16, 0, N'Not happened yet', NULL, N'1', CAST(N'2024-12-01T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (8, 14, 16, 0, N'Not happened yet', NULL, N'2', CAST(N'2024-12-08T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (9, 17, 15, 0, N'Not happened yet', NULL, N'2', CAST(N'2024-12-08T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (10, 14, 15, 0, N'Not happened yet', NULL, N'3', CAST(N'2024-12-15T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[Matchs] ([Id], [TeamA], [TeamB], [WinningTeam], [TotalResult], [Bracket], [Round], [Date], [TournamentId]) VALUES (11, 16, 17, 0, N'Not happened yet', NULL, N'3', CAST(N'2024-12-15T00:00:00.000' AS DateTime), 4)
SET IDENTITY_INSERT [dbo].[Matchs] OFF
GO
SET IDENTITY_INSERT [dbo].[Ranking] ON 

INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (1, 0, 0, 4, 14)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (2, 0, 0, 4, 15)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (3, 0, 0, 4, 16)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (4, 0, 0, 4, 17)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (5, 0, 0, 4, 14)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (6, 0, 0, 4, 15)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (7, 0, 0, 4, 16)
INSERT [dbo].[Ranking] ([Id], [Point], [Rank], [TournamentId], [TeamId]) VALUES (8, 0, 0, 4, 17)
SET IDENTITY_INSERT [dbo].[Ranking] OFF
GO
SET IDENTITY_INSERT [dbo].[Sports] ON 

INSERT [dbo].[Sports] ([Id], [Name], [Description]) VALUES (1, N'Badminton', N'A racquet sport played using racquets to hit a shuttlecock across a net')
INSERT [dbo].[Sports] ([Id], [Name], [Description]) VALUES (2, N'Football', N'A team sport played between two teams of eleven players with a spherical ball')
SET IDENTITY_INSERT [dbo].[Sports] OFF
GO
SET IDENTITY_INSERT [dbo].[TeamDetails] ON 

INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (1, 1, 1)
INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (2, 2, 2)
INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (3, 3, 1)
INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (20, 5, 16)
INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (21, 6, 17)
INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (22, 1, 14)
INSERT [dbo].[TeamDetails] ([Id], [UserId], [TeamId]) VALUES (23, 2, 15)
SET IDENTITY_INSERT [dbo].[TeamDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Teams] ON 

INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (1, N'Team Alpha', N'The alpha team for badminton', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (2, N'Team Bravo', N'The bravo team for badminton', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (3, N'Team Charlie', N'Football team Charlie', 2)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (4, N'Team Delta', N'Football team Delta', 2)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (5, N'string', N'string', 3)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (6, N'string', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (7, N'string', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (8, N'string', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (9, N'string', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (10, N'string', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (11, N'string', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (12, N'string1', N'string', 1)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (13, N'string1234', N'string', 2)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (14, N'Team Alpha', N'First team in the tournament', 4)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (15, N'Team Bravo', N'Second team in the tournament', 4)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (16, N'Team Charlie', N'Third team in the tournament', 4)
INSERT [dbo].[Teams] ([Id], [Name], [Description], [TournamentId]) VALUES (17, N'Team Delta', N'Fourth team in the tournament', 4)
SET IDENTITY_INSERT [dbo].[Teams] OFF
GO
SET IDENTITY_INSERT [dbo].[Tournaments] ON 

INSERT [dbo].[Tournaments] ([Id], [Name], [Description], [Rules], [Format], [NumOfParticipants], [SlotLeft], [StartDate], [EndDate], [Fee], [IsRegister], [CreateMatch], [Place], [SportId], [UserId]) VALUES (1, N'FPT University Badminton Tournament', N'A badminton tournament for students of FPT University', N'Standard Badminton Rules', N'League', 16, 14, CAST(N'2024-10-01T00:00:00.000' AS DateTime), CAST(N'2024-10-05T00:00:00.000' AS DateTime), 100, 1, 0, N'FPT Campus', 1, 1)
INSERT [dbo].[Tournaments] ([Id], [Name], [Description], [Rules], [Format], [NumOfParticipants], [SlotLeft], [StartDate], [EndDate], [Fee], [IsRegister], [CreateMatch], [Place], [SportId], [UserId]) VALUES (2, N'FPT University Football Tournament', N'A football tournament for students of FPT University', N'Standard Football Rules', N'Knockout', 8, 6, CAST(N'2024-11-10T00:00:00.000' AS DateTime), CAST(N'2024-11-20T00:00:00.000' AS DateTime), 200, 1, 0, N'FPT Stadium', 2, 2)
INSERT [dbo].[Tournaments] ([Id], [Name], [Description], [Rules], [Format], [NumOfParticipants], [SlotLeft], [StartDate], [EndDate], [Fee], [IsRegister], [CreateMatch], [Place], [SportId], [UserId]) VALUES (3, N'Summer Badminton Championship 2024', N'An annual badminton tournament featuring top players from around the region.', N'Standard BWF rules apply. All matches are best of three games to 21 points.', N'Knockout', 16, 15, CAST(N'2024-11-01T09:00:00.000' AS DateTime), CAST(N'2024-11-05T18:00:00.000' AS DateTime), 20, 1, 0, N'Ho Chi Minh City Sports Complex', 1, 4)
INSERT [dbo].[Tournaments] ([Id], [Name], [Description], [Rules], [Format], [NumOfParticipants], [SlotLeft], [StartDate], [EndDate], [Fee], [IsRegister], [CreateMatch], [Place], [SportId], [UserId]) VALUES (4, N'Sample Tournament', N'This is a sample tournament for testing purposes', N'Standard Rules', N'League', 8, 4, CAST(N'2024-12-01T00:00:00.000' AS DateTime), CAST(N'2024-12-15T00:00:00.000' AS DateTime), 150, 1, 0, N'Ho Chi Minh City', 1, 1)
SET IDENTITY_INSERT [dbo].[Tournaments] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Role], [Name], [Password], [Email], [PhoneNumber], [UserStatus], [Gender], [DateOfBirth], [Nationality]) VALUES (1, 1, N'John Doe', N'123', N'johndoe@example.com', N'0123456789', 1, 1, CAST(N'1985-06-15T00:00:00.000' AS DateTime), N'USA')
INSERT [dbo].[Users] ([Id], [Role], [Name], [Password], [Email], [PhoneNumber], [UserStatus], [Gender], [DateOfBirth], [Nationality]) VALUES (2, 2, N'Jane Smith', N'123', N'janesmith@example.com', N'0987654321', 1, 2, CAST(N'1990-08-22T00:00:00.000' AS DateTime), N'UK')
INSERT [dbo].[Users] ([Id], [Role], [Name], [Password], [Email], [PhoneNumber], [UserStatus], [Gender], [DateOfBirth], [Nationality]) VALUES (3, 2, N'Nguyen Van A', N'123', N'nguyenvana@example.com', N'0333555777', 1, 1, CAST(N'1992-02-28T00:00:00.000' AS DateTime), N'Vietnam')
INSERT [dbo].[Users] ([Id], [Role], [Name], [Password], [Email], [PhoneNumber], [UserStatus], [Gender], [DateOfBirth], [Nationality]) VALUES (4, 0, N'Tien', N'Tien123', N'hoangtien01052003@gmail.com', N'string', 1, 0, CAST(N'2024-10-06T19:12:21.063' AS DateTime), N'Viet Nam')
INSERT [dbo].[Users] ([Id], [Role], [Name], [Password], [Email], [PhoneNumber], [UserStatus], [Gender], [DateOfBirth], [Nationality]) VALUES (5, 0, N'Alice Brown', N'123', N'alice.brown@example.com', N'0112345678', 0, 1, CAST(N'1993-03-18T00:00:00.000' AS DateTime), N'Canada')
INSERT [dbo].[Users] ([Id], [Role], [Name], [Password], [Email], [PhoneNumber], [UserStatus], [Gender], [DateOfBirth], [Nationality]) VALUES (6, 0, N'Bob Johnson', N'123', N'bob.johnson@example.com', N'0198765432', 0, 0, CAST(N'1988-07-30T00:00:00.000' AS DateTime), N'Australia')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[BadmintonMatchDetails]  WITH CHECK ADD  CONSTRAINT [FK_BadmintonMatchDetails_Matchs] FOREIGN KEY([MatchId])
REFERENCES [dbo].[Matchs] ([Id])
GO
ALTER TABLE [dbo].[BadmintonMatchDetails] CHECK CONSTRAINT [FK_BadmintonMatchDetails_Matchs]
GO
ALTER TABLE [dbo].[Matchs]  WITH CHECK ADD  CONSTRAINT [FK_Matchs_Tournaments] FOREIGN KEY([TournamentId])
REFERENCES [dbo].[Tournaments] ([Id])
GO
ALTER TABLE [dbo].[Matchs] CHECK CONSTRAINT [FK_Matchs_Tournaments]
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD  CONSTRAINT [FK_Payment_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Payment] CHECK CONSTRAINT [FK_Payment_Users]
GO
ALTER TABLE [dbo].[Ranking]  WITH CHECK ADD  CONSTRAINT [FK_Ranking_Teams] FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
GO
ALTER TABLE [dbo].[Ranking] CHECK CONSTRAINT [FK_Ranking_Teams]
GO
ALTER TABLE [dbo].[Ranking]  WITH CHECK ADD  CONSTRAINT [FK_Ranking_Tournaments] FOREIGN KEY([TournamentId])
REFERENCES [dbo].[Tournaments] ([Id])
GO
ALTER TABLE [dbo].[Ranking] CHECK CONSTRAINT [FK_Ranking_Tournaments]
GO
ALTER TABLE [dbo].[TeamDetails]  WITH CHECK ADD  CONSTRAINT [FK_TeamDetails_Teams] FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
GO
ALTER TABLE [dbo].[TeamDetails] CHECK CONSTRAINT [FK_TeamDetails_Teams]
GO
ALTER TABLE [dbo].[TeamDetails]  WITH CHECK ADD  CONSTRAINT [FK_TeamDetails_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TeamDetails] CHECK CONSTRAINT [FK_TeamDetails_Users]
GO
ALTER TABLE [dbo].[Teams]  WITH CHECK ADD  CONSTRAINT [FK_Teams_Tournaments] FOREIGN KEY([TournamentId])
REFERENCES [dbo].[Tournaments] ([Id])
GO
ALTER TABLE [dbo].[Teams] CHECK CONSTRAINT [FK_Teams_Tournaments]
GO
ALTER TABLE [dbo].[Tournaments]  WITH CHECK ADD  CONSTRAINT [FK_Tournaments_Sports] FOREIGN KEY([SportId])
REFERENCES [dbo].[Sports] ([Id])
GO
ALTER TABLE [dbo].[Tournaments] CHECK CONSTRAINT [FK_Tournaments_Sports]
GO
ALTER TABLE [dbo].[Tournaments]  WITH CHECK ADD  CONSTRAINT [FK_Tournaments_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Tournaments] CHECK CONSTRAINT [FK_Tournaments_Users]
GO
USE [master]
GO
ALTER DATABASE [Ninety] SET  READ_WRITE 
GO
