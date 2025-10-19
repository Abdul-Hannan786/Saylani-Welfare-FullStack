import api from "@/axios";
import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Image,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [lang, setLang] = useState("english");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/reports");
        const { files, aiInsights } = res.data;

        const merged = files.map((file) => ({
          ...file,
          aiInsight: aiInsights.find((ai) => ai.fileId === file._id),
        }));

        setReports(merged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getFileIcon = (fileType) => {
    if (fileType === "pdf") {
      return <FileText className="h-5 w-5 text-red-500" />;
    }
    return <Image className="h-5 w-5 text-blue-500" />;
  };

  const getFileTypeColor = (fileType) => {
    return fileType === "pdf"
      ? "bg-red-100 text-red-800"
      : "bg-blue-100 text-blue-800";
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
          <p className="text-gray-600 mt-2">
            View and manage your uploaded medical reports
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {reports.length} {reports.length === 1 ? "Report" : "Reports"}
        </Badge>
      </div>

      {/* Reports Table */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle>Uploaded Reports</CardTitle>
          <CardDescription>
            All your medical reports with AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                    File
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                    Preview
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="h-12 w-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium">
                          No reports uploaded yet
                        </p>
                        <p className="text-sm mt-1">
                          Upload your first medical report to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reports.map((report, index) => (
                    <tr
                      key={report._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(report.fileType)}
                          <div>
                            <p className="font-medium text-gray-900">
                              Report {index + 1}
                            </p>
                            <p className="text-sm text-gray-500">
                              {report.fileType.toUpperCase()} File
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className={getFileTypeColor(report.fileType)}
                        >
                          {report.fileType.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {report.fileType === "pdf" ? (
                          <a
                            href={report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              View PDF
                            </span>
                          </a>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="space-x-2"
                              >
                                <Image className="h-4 w-4" />
                                <span>Preview</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Image Preview</DialogTitle>
                              </DialogHeader>
                              <div className="flex justify-center">
                                <img
                                  src={report.fileUrl}
                                  alt="Medical report"
                                  className="max-w-full h-auto rounded-lg border"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setSelectedReport(report)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            AI Summary
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary Dialog */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="w-full max-w-[90vw] lg:max-w-6xl xl:max-w-7xl max-h-[90vh] overflow-y-auto mx-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span>AI Report Summary</span>
                </DialogTitle>
                <DialogDescription className="flex items-center space-x-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Uploaded on {new Date(selectedReport.date).toLocaleString()}
                  </span>
                  <Badge
                    variant="outline"
                    className={getFileTypeColor(selectedReport.fileType)}
                  >
                    {selectedReport.fileType.toUpperCase()}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {selectedReport.aiInsight ? (
                  <>
                    {/* Language Tabs */}
                    <Tabs
                      value={lang}
                      onValueChange={setLang}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="english"
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>English</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="urdu"
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Roman Urdu</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="english" className="space-y-4 mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              English Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 leading-relaxed">
                              {selectedReport.aiInsight.englishSummary ||
                                "No English summary available for this report."}
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="urdu" className="space-y-4 mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Roman Urdu Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 leading-relaxed font-urdu">
                              {selectedReport.aiInsight.urduSummary ||
                                "No Urdu summary available for this report."}
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>

                    {/* Doctor Questions */}
                    {selectedReport.aiInsight.doctorQuestions?.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <span>Questions for Your Doctor</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {selectedReport.aiInsight.doctorQuestions.map(
                              (question, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                                    {index + 1}
                                  </div>
                                  <p className="text-gray-700 leading-relaxed">
                                    {question}
                                  </p>
                                </li>
                              )
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No AI Summary Available
                        </h3>
                        <p className="text-gray-600">
                          This report doesn't have an AI-generated summary yet.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>File ID: {selectedReport._id}</span>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedReport(null)}
                    >
                      Close
                    </Button>
                    <Button asChild>
                      <a
                        href={selectedReport.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Original</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Report;
