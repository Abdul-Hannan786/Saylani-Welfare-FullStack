import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText, Calendar, AlertCircle, Download } from "lucide-react";
import api from "@/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/reports/recent");
        if (data.success) {
          setRecentReports(data.recentReports || []);
          console.log(data);
        } else {
          toast.error("Failed to fetch recent reports");
        }
      } catch (err) {
        console.error("Error fetching recent reports:", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading recent reports...</p>
    );
  return (
    <div className="mt-6">
      <Card className="shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Recent Reports
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Your latest medical reports with AI insights
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/report")}
            className="flex items-center space-x-2"
          >
            <span>View All</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          {recentReports.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              {/* Mobile Scroll Container */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm whitespace-nowrap">
                        #
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm whitespace-nowrap">
                        File Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm whitespace-nowrap">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {recentReports.map((r, i) => (
                      <tr
                        key={r._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                          {i + 1}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className="capitalize font-normal"
                          >
                            {r.fileType}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                          {new Date(r.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <Button
                            size="sm"
                            onClick={() => setSelectedReport(r)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Summary
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">
                No reports uploaded yet
              </p>
              <p className="text-gray-400 text-sm">
                Upload your first medical report to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] overflow-hidden flex flex-col">
          {selectedReport && (
            <>
              <DialogHeader className="pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-semibold">
                      AI Report Summary
                    </DialogTitle>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(selectedReport.date).toLocaleString()}
                        </span>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {selectedReport.fileType} File
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {selectedReport.aiInsight ? (
                  <>
                    {/* English Summary */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>English Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {selectedReport.aiInsight.englishSummary ||
                              "No English summary available for this report."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Urdu Summary */}
                    {selectedReport.aiInsight.urduSummary && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center space-x-2 text-lg">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Roman Urdu Summary</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-urdu">
                              {selectedReport.aiInsight.urduSummary}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Doctor Questions */}
                    {selectedReport.aiInsight.doctorQuestions?.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center space-x-2 text-lg">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <span>Questions for Your Doctor</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedReport.aiInsight.doctorQuestions.map(
                              (q, i) => (
                                <div
                                  key={i}
                                  className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-100"
                                >
                                  <div className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                                    {i + 1}
                                  </div>
                                  <p className="text-gray-700 leading-relaxed flex-1">
                                    {q}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No AI Summary Available
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      This report doesn't have an AI-generated summary yet.
                      Please check back later or upload the report again.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t bg-gray-50/50 -mx-6 px-6 py-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>File ID: {selectedReport._id.slice(-8)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedReport(null)}
                    className="min-w-[80px]"
                  >
                    Close
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a
                      href={selectedReport.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
