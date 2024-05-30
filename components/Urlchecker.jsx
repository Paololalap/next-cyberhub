"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clipboard, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL."),
});

export default function UrlChecker({ className }) {
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
      const response = await fetch(`/api/google-api`, {
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
      const response = await fetch(`/api/ipquality-api`, {
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
    try {
      await Promise.allSettled([handleGSafeBrowsing(), handleIPQuality()]);
    } catch (error) {
      // Handle any errors that occur during the execution of either promise
      console.error("Error during handleSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue("url", text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  return (
    <div
      className={cn(
        "mt-5 flex w-screen items-center justify-center px-5 md:px-0",
        className,
      )}
    >
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
                      <div className="relative">
                        <Input
                          placeholder="e.g., https://google.com"
                          className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-black focus:outline-none"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-black/10 hover:opacity-75"
                          onClick={handlePaste}
                        >
                          <Clipboard className="size-5" />
                        </button>
                      </div>
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
