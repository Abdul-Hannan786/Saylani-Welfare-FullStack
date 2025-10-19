/* eslint-disable no-unused-vars */
import api from "@/axios";
import { FileText, Heart, Calendar, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const getFileTypeIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "jpg":
      case "png":
      case "jpeg":
        return "🖼️";
      default:
        return "📎";
    }
  };

  const getStatusColor = (kind) => {
    return kind === "file"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/reports/timeline/all");
        setTimeline(data.timeline);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Medical Timeline
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Track patient reports and vital measurements over time
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {timeline.length} {timeline.length === 1 ? "entry" : "entries"}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeline.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(item.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </td>

                  {/* Type Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.kind === "file" ? (
                        <>
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            Report
                          </span>
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            Vitals
                          </span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Details Column */}
                  <td className="px-6 py-4">
                    {item.kind === "file" ? (
                      <div className="flex items-center">
                        <span className="text-lg mr-2">
                          {getFileTypeIcon(item.fileType)}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.fileType?.toUpperCase()} Report
                          </div>
                          <div className="text-xs text-gray-500">
                            Medical document
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">BP:</span> {item.bp}
                        </div>
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">Sugar:</span>{" "}
                          {item.sugar}
                        </div>
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">Weight:</span>{" "}
                          {item.weight}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        item.kind
                      )}`}
                    >
                      {item.kind === "file" ? "Document" : "Measurements"}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      {item.kind === "file" && item.fileUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Open
                          </a>
                        </Button>
                      )}

                      {/* Dialog for detailed view */}
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            {item.kind === "file" ? (
                              <>
                                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                Medical Report
                              </>
                            ) : (
                              <>
                                <Heart className="h-5 w-5 text-green-500 mr-2" />
                                Vital Measurements
                              </>
                            )}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(item.date).toLocaleString()}
                          </div>

                          {item.kind === "file" ? (
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <span className="text-lg mr-2">
                                  {getFileTypeIcon(item.fileType)}
                                </span>
                                <div>
                                  <div className="font-medium">
                                    File Type: {item.fileType?.toUpperCase()}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Medical Report Document
                                  </div>
                                </div>
                              </div>
                              {item.fileUrl && (
                                <Button asChild className="w-full">
                                  <a
                                    href={item.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open Full Report
                                  </a>
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-500 uppercase font-medium">
                                  Blood Pressure
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                  {item.bp}
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-500 uppercase font-medium">
                                  Sugar
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                  {item.sugar}
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                                <div className="text-xs text-gray-500 uppercase font-medium">
                                  Weight
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                  {item.weight}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {timeline.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No timeline entries
            </h3>
            <p className="text-gray-500">
              Patient timeline entries will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
