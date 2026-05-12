import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeTrade, type TradeAnalysisInput } from '@/lib/ai/trading'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get user from auth
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      imageUrl, 
      uploadType, 
      roastMode = false,
      tradeType,
      entryPrice,
      exitPrice,
      stopLoss,
      target,
      instrument,
      notes 
    } = body

    // Create upload record
    const { data: upload, error: uploadError } = await supabase
      .from('trade_uploads')
      .insert({
        user_id: user.id,
        image_url: imageUrl || 'manual',
        upload_type: uploadType || 'trade',
        status: 'processing',
      })
      .select()
      .single()

    if (uploadError) throw uploadError

    // Prepare analysis input
    const analysisInput: TradeAnalysisInput = {
      screenshotUrl: imageUrl,
      tradeType: tradeType || 'long',
      entryPrice: entryPrice ? parseFloat(entryPrice) : undefined,
      exitPrice: exitPrice ? parseFloat(exitPrice) : undefined,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      target: target ? parseFloat(target) : undefined,
      instrument: instrument || 'Nifty 50',
      timestamp: new Date().toISOString(),
      notes: notes || (roastMode ? 'ROAST MODE' : ''),
    }

    // Call real AI for analysis
    let analysis
    try {
      analysis = await analyzeTrade(analysisInput)
    } catch (aiError) {
      console.error('AI Analysis failed, using fallback:', aiError)
      // If AI fails, return a graceful error message
      return NextResponse.json({
        error: 'AI analysis temporarily unavailable. Please try again.',
        uploadId: upload.id
      }, { status: 503 })
    }

    // Create AI report
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .insert({
        upload_id: upload.id,
        user_id: user.id,
        overall_score: analysis.overall_score,
        trade_score: analysis.trade_score,
        psychology_score: analysis.psychology_score,
        discipline_score: analysis.discipline_score,
        risk_score: analysis.risk_score,
        confidence_score: analysis.confidence_score,
        trader_type: analysis.trader_type,
        mistakes: analysis.mistakes,
        psychology: analysis.psychology,
        risk: analysis.risk,
        suggestions: analysis.suggestions,
        mentor_advice: analysis.mentor_advice,
        roast_mode: roastMode,
      })
      .select()
      .single()

    if (reportError) throw reportError

    // Update upload status
    await supabase
      .from('trade_uploads')
      .update({ status: 'completed' })
      .eq('id', upload.id)

    return NextResponse.json({ 
      report, 
      upload,
      analysis // Return full analysis details
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to process analysis' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: reports, error } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}