import PdfReactPdf from "@/components/PDFViewer";

export default function Home() {
  const fileId = 1;
  return (
      <div suppressHydrationWarning={true}>
        <PdfReactPdf fileId={fileId} getTitle={true} />
      </div>
  );
}
