"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL."),
});

export default function UrlChecker() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(null);
  const [gSafeResult, setGSafeResult] = useState(null);
  const [isLoadingIPQuality, setIsLoadingIPQuality] = useState(false);
  const [isLoadingGSafeBrowsing, setIsLoadingGSafeBrowsing] = useState(false);

  const handleGSafeBrowsing = async () => {
    try {
      setIsLoadingGSafeBrowsing(true); // Set loading state to true
      const { url } = form.getValues();
      const response = await fetch("http://localhost:3000/api/google-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setGSafeResult(data);
      setIsLoadingGSafeBrowsing(false); // Set loading state to false
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoadingGSafeBrowsing(false); // Set loading state to false
    }
  };

  const handleIPQuality = async () => {
    try {
      setIsLoadingIPQuality(true); // Set loading state to true
      const { url } = form.getValues();
      const response = await fetch("http://localhost:3000/api/ipquality-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      const { risk_score } = data;
      setRiskScore(risk_score);
      setIsLoadingIPQuality(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoadingIPQuality(false); // Set loading state to false
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await handleGSafeBrowsing();
    await handleIPQuality();
  };

  return (
    <div className="mt-5 flex items-center justify-center px-5 md:px-0">
      <div className="w-full max-w-md rounded-lg border-2 border-solid border-black bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-xl font-semibold">URL Checker</h2>
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="e.g., https://google.com"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-md bg-blue-500 text-white hover:bg-blue-500/90 focus:border-black focus:outline-none"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Check URL
              </Button>
            </form>
          </Form>
        </div>
        {/* Display the risk score if available */}
        <table className="w-full">
          <thead>
            <tr className="flex">
              <th className="flex-1">Security Analysis</th>
              <th className="flex-1">Status</th>
            </tr>
          </thead>
          <tbody className="flex flex-col items-center">
            {/* IP Quality */}
            <tr className="flex w-full items-center justify-around">
              <td className="flex-1 text-center">IPQuality</td>
              <td
                className={`grid flex-1 place-items-center text-center text-lg font-semibold ${
                  riskScore !== null
                    ? riskScore >= 75
                      ? "text-red-500"
                      : "text-green-500"
                    : ""
                }`}
              >
                {isLoadingIPQuality ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : riskScore !== null ? (
                  riskScore >= 75 ? (
                    "Suspicious"
                  ) : (
                    "Safe"
                  )
                ) : (
                  ""
                )}
              </td>
            </tr>
            {/* Google Safe Browsing */}
            <>
              <tr className="flex w-full items-center justify-around">
                <td className="flex-1 text-center">Google Safe Browsing</td>
                {gSafeResult ? (
                  <td
                    className={`flex-1 text-center text-lg font-semibold ${
                      isLoadingGSafeBrowsing
                        ? ""
                        : gSafeResult.matches && gSafeResult.matches.length > 0
                          ? "text-red-500"
                          : "text-green-500"
                    }`}
                  >
                    {isLoadingGSafeBrowsing ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : gSafeResult.matches &&
                      gSafeResult.matches.length > 0 ? (
                      "Phishing"
                    ) : (
                      "Safe"
                    )}
                  </td>
                ) : (
                  <td className="flex-1"></td>
                )}
              </tr>
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}
