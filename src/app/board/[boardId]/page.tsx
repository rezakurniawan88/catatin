"use client"

import { Tldraw, Editor, TLUiStylePanelProps, useRelevantStyles, DefaultStylePanel, DefaultStylePanelContent, TLComponents } from "tldraw"
import 'tldraw/tldraw.css'
import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { axiosInstance } from "@/lib/axios"
import { useToast } from "@/components/ui/use-toast"
import { LucideLoader2 } from "lucide-react"

export default function BoardDetailPage({ params }: { params: { boardId: string } }) {
    const [editor, setEditor] = useState<Editor | null>(null)
    const { toast } = useToast();

    const handleMount = (editor: Editor) => {
        setEditor(editor)
    }

    function CustomStylePanel(props: TLUiStylePanelProps) {
        const styles = useRelevantStyles()

        return (
            <div className="mt-14">
                <DefaultStylePanel {...props}>
                    <DefaultStylePanelContent styles={styles} />
                </DefaultStylePanel>
            </div>
        )
    }

    const components: TLComponents = {
        StylePanel: CustomStylePanel,
    }

    const { mutate: onSaveBoardChanges, isLoading: saveBoardChangesIsLoading } = useMutation({
        mutationKey: "save-board",
        mutationFn: async () => {
            if (editor) {
                const snapshot = editor.getSnapshot();
                const response = await axiosInstance.patch(`/boards/${params?.boardId}`, { snapshot: JSON.stringify(snapshot) });
                return response?.data?.message;
            }
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: `${data}`,
            });
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    })

    const { mutate: onLoadSnapshotBoard } = useMutation({
        mutationKey: "get-board-by-id",
        mutationFn: async () => {
            const response = await axiosInstance.get(`/boards/${params?.boardId}`);
            return response?.data?.data;
        },
        onSuccess: (data) => {
            if (editor) {
                if (data?.data?.length > 0) {
                    const snapshot = JSON.parse(data?.data);
                    editor.loadSnapshot(snapshot);
                }
            }
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Load snapshot error",
                description: "There was a problem with your request.",
            })
        }
    })

    useEffect(() => {
        onLoadSnapshotBoard();
    }, [editor])

    return (
        <div className="fixed inset-0">
            <Tldraw
                persistenceKey={params?.boardId}
                onMount={handleMount}
                components={components}
            />
            <button onClick={() => onSaveBoardChanges()} className="absolute top-3 right-2 bg-blue-500 text-white text-sm py-2 px-4 rounded-sm hover:bg-blue-600">
                {saveBoardChangesIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Save Changes"}
            </button>
        </div>
    )
}