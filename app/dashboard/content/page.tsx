"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  FileText,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Globe,
  Calendar,
  User,
} from "lucide-react";

// Mock content data
const articles = [
  {
    id: "1",
    title: "Sustainable Tourism in Rwanda: A Model for Africa",
    author: "Dr. Sarah Mbeki",
    sector: "Tourism",
    country: "Rwanda",
    status: "Published",
    publishDate: "2024-07-25",
    views: 1247,
    excerpt:
      "Exploring how Rwanda has become a leading example of sustainable tourism practices...",
  },
  {
    id: "2",
    title: "Investment Opportunities in Kenya's Tech Sector",
    author: "Prof. James Okonkwo",
    sector: "Technology",
    country: "Kenya",
    status: "Published",
    publishDate: "2024-07-28",
    views: 892,
    excerpt:
      "A comprehensive analysis of emerging tech investment opportunities in Kenya...",
  },
  {
    id: "3",
    title: "Cultural Heritage Preservation in West Africa",
    author: "Dr. Fatima Al-Rashid",
    sector: "Culture",
    country: "Ghana",
    status: "Draft",
    publishDate: "2024-07-30",
    views: 0,
    excerpt:
      "Examining traditional methods and modern approaches to heritage conservation...",
  },
  {
    id: "4",
    title: "Infrastructure Development in Nigeria: Progress and Challenges",
    author: "Eng. Michael Thompson",
    sector: "Infrastructure",
    country: "Nigeria",
    status: "Under Review",
    publishDate: "2024-08-01",
    views: 0,
    excerpt:
      "An in-depth look at Nigeria's infrastructure development projects and their impact...",
  },
  {
    id: "5",
    title: "Economic Policy Reforms in Mali",
    author: "Prof. David Okello",
    sector: "Economy",
    country: "Mali",
    status: "Published",
    publishDate: "2024-07-20",
    views: 645,
    excerpt:
      "Analyzing recent economic policy changes and their implications for growth...",
  },
];

const statusColors = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-gray-100 text-gray-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  Archived: "bg-red-100 text-red-800",
};

const sectorColors = {
  Tourism: "bg-blue-100 text-blue-800",
  Technology: "bg-purple-100 text-purple-800",
  Culture: "bg-pink-100 text-pink-800",
  Infrastructure: "bg-orange-100 text-orange-800",
  Economy: "bg-green-100 text-green-800",
  Social: "bg-indigo-100 text-indigo-800",
};

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || article.status === selectedStatus;
    const matchesSector =
      selectedSector === "all" || article.sector === selectedSector;
    const matchesCountry =
      selectedCountry === "all" || article.country === selectedCountry;

    return matchesSearch && matchesStatus && matchesSector && matchesCountry;
  });

  const uniqueStatuses = [
    ...new Set(articles.map((article) => article.status)),
  ];
  const uniqueSectors = [...new Set(articles.map((article) => article.sector))];
  const uniqueCountries = [
    ...new Set(articles.map((article) => article.country)),
  ];

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage articles, posts, and content across sectors
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Articles
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter((a) => a.status === "Published").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Sectors Covered
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {uniqueSectors.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {uniqueSectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {uniqueCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredArticles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {article.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {article.excerpt}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {article.author}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          sectorColors[
                            article.sector as keyof typeof sectorColors
                          ]
                        }
                      >
                        {article.sector}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {article.country}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[
                            article.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {article.publishDate}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Article
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Article
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Globe className="mr-2 h-4 w-4" />
                            Publish/Unpublish
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Article
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
